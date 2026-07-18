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
            if raw.startswith('"') or raw.startswith("'") or '=' in raw:
                continue
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
    print("Computing galaxy layout...")
    t0 = time.time()

    isolated = [n for n in G.nodes() if G.degree(n) == 0]
    connected = [n for n in G.nodes() if G.degree(n) > 0]

    print(f"  {len(connected)} connected nodes, {len(isolated)} isolated nodes")

    pos = {}

    # ── Tier 1: Core — Connected graph ──────────────────────────────
    if connected:
        subG = G.subgraph(connected)
        pos_core = nx.spring_layout(subG, k=0.5, iterations=30, seed=42)
        points = np.array([pos_core[n] for n in connected])
        points -= points.mean(axis=0)
        scale_val = 3.0 / max(np.abs(points).max(), 1)
        points *= scale_val
        for i, n in enumerate(connected):
            pos[n] = points[i]
        print(f"  Core: {len(connected)} nodes in force-directed layout")

    # ── Tier 2: Inner Ring — Folder-cluster orbits ─────────────────
    # Group isolated nodes by top-level folder
    iso_by_folder = defaultdict(list)
    for n in isolated:
        folder = node_info[n][1]
        iso_by_folder[folder].append(n)

    # Sort folders by count descending, keep top N for orbits
    sorted_folders = sorted(iso_by_folder.items(), key=lambda x: -len(x[1]))
    orbit_folders = sorted_folders[:20]       # Tier 2
    halo_nodes = []                           # Tier 3

    for folder, nodes in sorted_folders[20:]:
        halo_nodes.extend(nodes)

    orbit_radius_start = 4.0
    orbit_spacing = 0.6
    orbit_labels = []

    for i, (folder, nodes) in enumerate(orbit_folders):
        if not nodes:
            continue
        radius = orbit_radius_start + i * orbit_spacing
        angles = np.linspace(0, 2 * np.pi, len(nodes), endpoint=False)
        offset_angle = i * 0.1
        for j, node in enumerate(nodes):
            angle = angles[j] + offset_angle
            pos[node] = np.array([radius * np.cos(angle), radius * np.sin(angle)])

        # Store info for a cluster label (average position of first few nodes)
        if len(nodes) > 0:
            mid_angle = offset_angle + np.pi / 2
            label_r = radius + 0.5
            orbit_labels.append({
                'folder': folder,
                'count': len(nodes),
                'x': label_r * np.cos(mid_angle),
                'y': label_r * np.sin(mid_angle),
            })
        print(f"  Orbit {i+1}: {clean_folder_name(folder)} ({len(nodes)} nodes) @ r={radius:.1f}")

    # ── Tier 3: Outer Halo ─────────────────────────────────────────
    if halo_nodes:
        n_halo = len(halo_nodes)
        halo_radius = orbit_radius_start + len(orbit_folders) * orbit_spacing + 0.8
        rng = np.random.RandomState(42)
        for node in halo_nodes:
            angle = rng.uniform(0, 2 * np.pi)
            r_jitter = rng.uniform(-0.3, 0.3)
            r = halo_radius + r_jitter
            pos[node] = np.array([r * np.cos(angle), r * np.sin(angle)])
        print(f"  Halo: {n_halo} nodes @ r≈{halo_radius:.1f}")

    print(f"  Layout done in {time.time()-t0:.1f}s")
    return pos, orbit_labels


def render_graph(G, pos, node_info, output_path, figsize, orbit_labels=None, dpi=150):
    print(f"Rendering {os.path.basename(output_path)} ...")
    t0 = time.time()

    plt.style.use('dark_background')
    fig, ax = plt.subplots(1, 1, figsize=figsize)
    fig.patch.set_facecolor('#0f0f13')
    ax.set_facecolor('#0f0f13')

    # ── Folder colour mapping ───────────────────────────────────────
    folder_counts = defaultdict(int)
    for _, (_, folder) in node_info.items():
        folder_counts[folder] += 1

    sorted_folders = [f for f, _ in sorted(folder_counts.items(), key=lambda x: -x[1])]
    top_folders = sorted_folders[:15]

    palette = [
        '#4edea3', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE',
        '#85C1E9', '#F0B27A', '#82E0AA', '#F1948A', '#AEB6BF',
    ]
    folder_to_color = {
        folder: palette[i % len(palette)]
        for i, folder in enumerate(top_folders)
    }
    folder_to_color['__other__'] = '#555555'

    # ── Separate connected / isolated for styling ───────────────────
    isolated_set = {n for n in G.nodes() if G.degree(n) == 0}
    connected_list = [n for n in G.nodes() if G.degree(n) > 0]
    isolated_list = list(isolated_set)

    degrees = dict(G.degree())
    deg_vals = [d for n, d in degrees.items() if G.degree(n) > 0]
    dmin = min(deg_vals) if deg_vals else 0
    dmax = max(deg_vals) if deg_vals else 1

    # ── Edges (LineCollection — only connected graph) ──────────────
    e_positions = []
    for u, v in G.edges():
        if u in pos and v in pos:
            e_positions.append([pos[u], pos[v]])
    if e_positions:
        ax.add_collection(
            LineCollection(
                e_positions,
                colors='#4edea3',
                alpha=0.08,
                linewidths=0.2,
                zorder=2,
            )
        )

    # ── Connected nodes (Tier 1) ────────────────────────────────────
    if connected_list:
        c_colours, c_sizes = [], []
        c_xs, c_ys = [], []
        for n in connected_list:
            c_xs.append(pos[n][0])
            c_ys.append(pos[n][1])
            folder = node_info[n][1]
            c_colours.append(folder_to_color.get(folder, folder_to_color['__other__']))
            if dmax == dmin:
                c_sizes.append(15)
            else:
                c_sizes.append(10 + 40 * (degrees[n] - dmin) / (dmax - dmin))
        ax.scatter(
            c_xs, c_ys, s=c_sizes, c=c_colours, alpha=0.85,
            edgecolors='#ffffff', linewidths=0.15, zorder=10,
        )

    # ── Isolated nodes (Tier 2 & 3) ─────────────────────────────────
    if isolated_list:
        i_colours, i_sizes = [], []
        i_xs, i_ys = [], []
        for n in isolated_list:
            i_xs.append(pos[n][0])
            i_ys.append(pos[n][1])
            folder = node_info[n][1]
            i_colours.append(folder_to_color.get(folder, folder_to_color['__other__']))
            i_sizes.append(4)
        ax.scatter(
            i_xs, i_ys, s=i_sizes, c=i_colours, alpha=0.30,
            edgecolors='none', zorder=5,
        )

    # ── Orbit cluster labels (Tier 2) ───────────────────────────────
    if orbit_labels:
        for ol in orbit_labels:
            label = clean_folder_name(ol['folder'])
            colour = folder_to_color.get(ol['folder'], folder_to_color['__other__'])
            ax.text(
                ol['x'], ol['y'], f"{label} ({ol['count']})",
                color=colour, fontsize=5.5, alpha=0.7, ha='center', va='center',
                fontweight='bold', zorder=20,
            )

    # ── Decorative outer ring (glow) ────────────────────────────────
    all_pos = np.array(list(pos.values()))
    if len(all_pos) > 0:
        max_r = np.max(np.linalg.norm(all_pos, axis=1))
        ring_r = max_r + 0.8
        ring_angles = np.linspace(0, 2 * np.pi, 300)
        ring_x = ring_r * np.cos(ring_angles)
        ring_y = ring_r * np.sin(ring_angles)
        ax.plot(
            ring_x, ring_y, color='#4edea3', alpha=0.07,
            linewidth=0.5, linestyle='--', zorder=1,
        )

    # ── Title ───────────────────────────────────────────────────────
    ax.set_title(
        f"ric2brain  —  {G.number_of_nodes():,} note vault graph",
        color='#cccccc', fontsize=20, pad=15, fontweight='bold',
    )

    # ── Legend ──────────────────────────────────────────────────────
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
        labelcolor='#cccccc',
    )
    legend.get_frame().set_linewidth(0.5)

    ax.axis('off')
    ax.set_xlim(None, None)
    ax.set_ylim(None, None)

    fig.savefig(output_path, dpi=dpi, facecolor='#0f0f13',
                edgecolor='none', bbox_inches='tight', pad_inches=0.3)
    plt.close(fig)
    print(f"  Saved {os.path.basename(output_path)} in {time.time()-t0:.1f}s")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    G, node_info = build_graph(VAULT_PATH)
    pos, orbit_labels = compute_layout(G, node_info)

    render_graph(
        G, pos, node_info,
        os.path.join(OUTPUT_DIR, "ric2brain-graph-1200x1600.png"),
        figsize=(12, 16), orbit_labels=orbit_labels,
    )
    render_graph(
        G, pos, node_info,
        os.path.join(OUTPUT_DIR, "ric2brain-banner-1600x900.png"),
        figsize=(16, 9), orbit_labels=orbit_labels,
    )

    print(f"\nDone! Both images saved to {OUTPUT_DIR}")
    print(f"  1. ric2brain-graph-1200x1600.png")
    print(f"  2. ric2brain-banner-1600x900.png")


if __name__ == '__main__':
    main()
