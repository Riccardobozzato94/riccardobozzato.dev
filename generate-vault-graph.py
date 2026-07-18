import os, re, time, sys
from collections import defaultdict

import networkx as nx
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.collections import LineCollection
import numpy as np

VAULT_PATH = r"C:\Users\Ric\Desktop\project\hermes"
OUTPUT_DIR = r"C:\Users\Ric\Desktop\riccardobozzato.dev\public\assets"

WIKI_RE = re.compile(r'\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]')
SKIP_DIRS = {'.trash', '.git', '__pycache__', '.obsidian', '.github'}

# Map actual folder names to display labels (strip emoji)
FOLDER_LABELS = {
    'llm_wiki': 'LLM Wiki',
    '☁️ Drive': 'Drive',
    '🎬 Media': 'Media',
    '🏋️ Fitness': 'Fitness',
    '👤 Personal': 'Personal',
    '💡 Ideas': 'Ideas',
    '💻 Projects': 'Projects',
    '💼 Work': 'Work',
    '💾 Backup-PC': 'Backup-PC',
    '📊 Dashboard': 'Dashboard',
    '📓 Journal': 'Journal',
    '📥 Inbox': 'Inbox',
    '📸 Photos': 'Photos',
    '🗺️ MOC': 'MOC',
    '🛠️ Templates': 'Templates',
    '🧠 Agent Memory': 'Agent Memory',
    'agnes-ai-docs': 'Agnes AI Docs',
    '__root__': 'Root',
}


def clean_folder_name(folder):
    return FOLDER_LABELS.get(folder, folder)


def get_first_level(path, vault_root):
    rel = os.path.relpath(path, vault_root)
    parts = rel.split(os.sep)
    return parts[0] if len(parts) >= 2 else '__root__'


def build_graph(vault_path):
    print("Walking vault for .md files...")
    t0 = time.time()

    node_info = {}
    for root, dirs, files in os.walk(vault_path):
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in SKIP_DIRS]
        for f in files:
            if not f.endswith('.md'):
                continue
            fpath = os.path.join(root, f)
            stem = os.path.splitext(f)[0]
            first = get_first_level(fpath, vault_path)
            node_info[stem] = (fpath, first)

    print(f"  Found {len(node_info)} .md files in {time.time()-t0:.1f}s")

    print("Extracting wiki links...")
    t0 = time.time()

    G = nx.Graph()
    G.add_nodes_from(node_info.keys())

    edge_count = 0
    for stem, (fpath, folder) in node_info.items():
        try:
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as fh:
                content = fh.read(65536)
        except Exception:
            continue

        for match in WIKI_RE.finditer(content):
            raw = match.group(1).strip()
            # Skip template variables and dynamic refs
            if raw.startswith('"') or raw.startswith("'") or '=' in raw:
                continue
            # Skip non-md extensions
            ext = os.path.splitext(raw)[1].lower()
            if ext and ext != '.md':
                continue
            target = os.path.splitext(os.path.basename(raw))[0]
            if target in node_info and target != stem:
                G.add_edge(stem, target)
                edge_count += 1

    print(f"  Found {edge_count} edges in {time.time()-t0:.1f}s")
    print(f"  Graph: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")
    return G, node_info


def compute_layout(G, node_info):
    print("Computing layout...")
    t0 = time.time()

    isolated = [n for n in G.nodes() if G.degree(n) == 0]
    connected = [n for n in G.nodes() if G.degree(n) > 0]

    print(f"  {len(connected)} connected nodes, {len(isolated)} isolated nodes")

    pos = {}

    if connected:
        subG = G.subgraph(connected)
        comps = list(nx.connected_components(subG))
        comps.sort(key=len, reverse=True)
        print(f"  {len(comps)} connected components (largest: {len(comps[0])} nodes)")

        if len(comps) == 1:
            pos.update(nx.spring_layout(subG, k=0.3, iterations=20, seed=42))
        else:
            cols = int(np.ceil(np.sqrt(len(comps))))
            for idx, comp in enumerate(comps):
                c_sub = subG.subgraph(comp)
                c_pos = nx.spring_layout(c_sub, k=0.5, iterations=15, seed=42 + idx)
                row, col = idx // cols, idx % cols
                cx, cy = col * 3 - (cols - 1) * 1.5, -row * 3
                pts = np.array([c_pos[n] for n in comp])
                pts -= pts.mean(axis=0)
                pts *= 0.8
                for i, n in enumerate(comp):
                    pos[n] = pts[i] + np.array([cx, cy])

    if isolated:
        print(f"  Arranging {len(isolated)} isolated nodes in grid...")
        n_iso = len(isolated)
        cols = int(np.ceil(np.sqrt(n_iso)))
        spacing = 0.025
        if pos:
            min_y = min(p[1] for p in pos.values())
        else:
            min_y = 0
        gy = min_y - 1.0
        for i, node in enumerate(isolated):
            r, c = divmod(i, cols)
            pos[node] = np.array([c * spacing - (cols * spacing) / 2, gy - r * spacing])

    print(f"  Layout done in {time.time()-t0:.1f}s")
    return pos


def render_graph(G, pos, node_info, output_path, figsize, dpi=150):
    print(f"Rendering {os.path.basename(output_path)} ...")
    t0 = time.time()

    plt.style.use('dark_background')
    fig, ax = plt.subplots(1, 1, figsize=figsize)
    fig.patch.set_facecolor('#0f0f13')
    ax.set_facecolor('#0f0f13')

    # --- colour mapping ---
    folder_counts = defaultdict(int)
    for _, (_, folder) in node_info.items():
        folder_counts[folder] += 1

    sorted_folders = [f for f, _ in sorted(folder_counts.items(), key=lambda x: -x[1])]
    top_folders = sorted_folders[:15]

    palette = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
        '#F0B27A', '#82E0AA', '#F1948A', '#AEB6BF', '#73C6B6',
    ]
    folder_to_color = {
        folder: palette[i % len(palette)]
        for i, folder in enumerate(top_folders)
    }
    folder_to_color['__other__'] = '#555555'

    # --- node colours & sizes ---
    degrees = dict(G.degree())
    deg_vals = list(degrees.values())
    dmin, dmax = min(deg_vals), max(deg_vals)

    node_colours, node_sizes = [], []
    for n in G.nodes():
        folder = node_info[n][1]
        node_colours.append(folder_to_color.get(folder, folder_to_color['__other__']))
        if dmax == dmin:
            node_sizes.append(3)
        else:
            node_sizes.append(3 + 12 * (degrees[n] - dmin) / (dmax - dmin))

    # --- edges (LineCollection) ---
    e_positions, e_colours = [], []
    for u, v in G.edges():
        e_positions.append([pos[u], pos[v]])
        c = folder_to_color.get(node_info[u][1], '#555555')
        e_colours.append(c)
    if e_positions:
        ax.add_collection(
            LineCollection(e_positions, colors=e_colours, alpha=0.06, linewidths=0.15)
        )

    # --- nodes ---
    xs = [pos[n][0] for n in G.nodes()]
    ys = [pos[n][1] for n in G.nodes()]
    ax.scatter(xs, ys, s=node_sizes, c=node_colours, alpha=0.85,
               edgecolors='none', zorder=5)

    # --- title ---
    ax.set_title(
        f"ric2brain  —  {G.number_of_nodes():,} note vault graph",
        color='#cccccc', fontsize=20, pad=15, fontweight='bold'
    )

    # --- legend ---
    patches = []
    for folder in top_folders:
        label = clean_folder_name(folder)
        cnt = folder_counts[folder]
        patches.append(
            mpatches.Patch(color=folder_to_color[folder],
                           label=f"{label} ({cnt})", alpha=0.8)
        )
    other_cnt = sum(c for f, c in folder_counts.items() if f not in top_folders)
    patches.append(
        mpatches.Patch(color=folder_to_color['__other__'],
                       label=f"Other ({other_cnt})", alpha=0.8)
    )

    legend = ax.legend(
        handles=patches, loc='upper left', framealpha=0.15,
        facecolor='#1a1a24', edgecolor='#333333', fontsize=7,
        labelcolor='#cccccc'
    )
    legend.get_frame().set_linewidth(0.5)

    ax.axis('off')

    fig.savefig(output_path, dpi=dpi, facecolor='#0f0f13',
                edgecolor='none', bbox_inches='tight', pad_inches=0.3)
    plt.close(fig)
    print(f"  Saved {os.path.basename(output_path)} in {time.time()-t0:.1f}s")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    G, node_info = build_graph(VAULT_PATH)
    pos = compute_layout(G, node_info)

    render_graph(
        G, pos, node_info,
        os.path.join(OUTPUT_DIR, "ric2brain-graph-1200x1600.png"),
        figsize=(12, 16),
    )
    render_graph(
        G, pos, node_info,
        os.path.join(OUTPUT_DIR, "ric2brain-banner-1600x900.png"),
        figsize=(16, 9),
    )

    print(f"\nDone! Both images saved to {OUTPUT_DIR}")
    print(f"  1. ric2brain-graph-1200x1600.png")
    print(f"  2. ric2brain-banner-1600x900.png")


if __name__ == '__main__':
    main()
