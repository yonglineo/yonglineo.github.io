// blog-post-3.jsx — "Competitive Programming Notes #1: Colorful Tree"
const TeX = window.TeX;
const Spoiler = window.Spoiler;

const CPP_CODE_N1 = `// LUOGU_RID: 139270322
// Problem: F - Colorful Tree
// Memory Limit: 1024 MB
// Time Limit: 4000 ms

//闲敲棋子落灯花//
#include<bits/stdc++.h>
using namespace std;
using i64 = long long;

struct edge {
    int u, v, color, w;
};
struct query {
    int u, v, color, new_w, id;
};
const int N = 1e5 + 50, K = 30;
vector<pair<int, int>> G[N];
int dep[N], sp[N][K], val[N], ti, tin[N], tout[N];
void dfs(int u, int p) {
    tin[u] = ++ti; dep[u] = dep[p] + 1; sp[u][0] = p;
    for (int i = 1; i < K; i++)sp[u][i] = sp[sp[u][i - 1]][i - 1];
    for (auto v : G[u]) if (v.first != p) {
        val[v.first] = val[u] + v.second;
        dfs(v.first, u);
    }
    tout[u] = ti;
}
int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    for (int i = K - 1; i >= 0; i--)if (dep[sp[u][i]] >= dep[v])u = sp[u][i];
    if (u == v) return u;
    for (int i = K - 1; i >= 0; i--)if (sp[u][i] != sp[v][i])u = sp[u][i], v = sp[v][i];
    return sp[v][0];
}
int dis(int u, int v) {
    int l = lca(u, v);
    return val[u] + val[v] - 2 * val[l];
}
struct segtree {
    struct node {
        i64 v;
        friend node operator + (node a, node b) {
            node t; t.v = a.v + b.v;
            return t;
        }
    };
    vector<node> tr;
    vector<int> tag;
    int SZ = 0;
    void apply_node(int p, int x) {
        tr[p].v += x;
        tag[p] += x;
    }
    void pushdown(int p) {
        if (tag[p] != 0) {
            apply_node(p << 1, tag[p]);
            apply_node(p << 1 | 1, tag[p]);
            tag[p] = 0;
        }
        return;
    }

    segtree(int N) {
        SZ = N + 200;
        tr.resize(SZ * 4);
        tag.assign(SZ * 4, 0);
    }
#define ls p<<1
#define rs p<<1|1
    void update(int x, int v) { update(1, 1, SZ - 100, v, x, x); }
    void update(int x, int y, int v) { update(1, 1, SZ - 100, v, x, y); }
    void update(int p, int l, int r, int v, int lq, int rq) {
        if (lq <= l && r <= rq) {
            apply_node(p, v);
            return;
        }
        int mid = (l + r) >> 1;
        pushdown(p);
        if (lq <= mid) update(ls, l, mid, v, lq, rq);
        if (rq >= mid + 1) update(rs, mid + 1, r, v, lq, rq);
        tr[p] = tr[ls] + tr[rs];
    }
    node query(int x) { return query(1, 1, SZ - 100, x, x); }
    node query(int x, int y) { return query(1, 1, SZ - 100, x, y); }
    node query(int p, int l, int r, int lq, int rq) {
        if (lq <= l && r <= rq) {
            return tr[p];
        }
        int mid = (l + r) >> 1;
        pushdown(p);
        if (lq <= mid && rq >= mid + 1) return query(ls, l, mid, lq, rq) + query(rs, mid + 1, r, lq, rq);
        if (lq <= mid) return query(ls, l, mid, lq, rq);
        if (rq >= mid + 1) return query(rs, mid + 1, r, lq, rq);
    }
};
//update/query -> point or range
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr); cout.tie(nullptr);

    int N, Q; cin >> N >> Q;
    vector<vector<edge>> C(N + 1);
    for (int i = 0; i < N - 1; i++) {
        int a, b, c, d; cin >> a >> b >> c >> d;
        G[a].push_back({ b,d });
        G[b].push_back({ a,d });
        C[c].push_back({ a,b,c,d });
    }
    dfs(1, 0);
    vector<vector<query>> Qp(N + 1);
    vector<int> ans(Q + 1);
    for (int i = 0; i < Q; i++) {
        int a, b, c, d; cin >> a >> b >> c >> d;
        ans[i] = dis(c, d);
        Qp[a].push_back({ c,d,a,b,i });
    }
    /*
        let the initial answer for each query to be
        l = lca(u,v), ans[i] = dis(u,l) + dis(l,v)
        loop through each color:
            add the entire subtree  S       +1 when going down
                                    dep     +w when going down
            then ans[i] -= dis(a,b) on the subtree
                 ans[i] += S(a,b) * new_w

        this is O(N * C) where C = color count
        we cant just traverse every single node so lets use
        dfn values and a segment tree
    */
    segtree segcnt(N), segval(N);
    for (int i = 1; i <= N; i++) {
        for (auto p : C[i]) {
            int u = p.u, v = p.v, w = p.w;
            if (dep[u] > dep[v]) swap(u, v);
            segcnt.update(tin[v], tout[v], 1);
            segval.update(tin[v], tout[v], w);
        }

        for (auto p : Qp[i]) {
            int u = p.u, v = p.v, w = p.new_w;
            if (dep[u] > dep[v]) swap(u, v);
            int l = lca(u, v);
            int cnt = segcnt.query(tin[u]).v + segcnt.query(tin[v]).v - 2 * segcnt.query(tin[l]).v;
            int val = segval.query(tin[u]).v + segval.query(tin[v]).v - 2 * segval.query(tin[l]).v;
            ans[p.id] -= val;
            ans[p.id] += cnt * p.new_w;
        }

        for (auto p : C[i]) {
            int u = p.u, v = p.v, w = p.w;
            if (dep[u] > dep[v]) swap(u, v);
            segcnt.update(tin[v], tout[v], -1);
            segval.update(tin[v], tout[v], -w);
        }
    }
    for (int i = 0; i < Q; i++) {
        cout << ans[i] << '\\n';
    }
}
`;

function ColorfulTreePost() {
  return (
    <div className="post-prose">
      <p><a href="https://atcoder.jp/contests/abc133/tasks/abc133_f" target="_blank" rel="noopener">Problem link ↗</a> — AtCoder ABC133F</p>
      <p><em>Try to solve the task independently before continuing the blog.</em></p>

      <Spoiler summary="Hint">
        <p>First of all, we can observe that queries can be done offline and the only thing that matters for each query is the color.</p>
      </Spoiler>

      <Spoiler summary="Incomplete solution">
        <p>Let's do each color one by one. We can observe that distance between two nodes in the query = original distance − sum of edge weight of color <TeX tex="x" /> + number of edges that have color <TeX tex="x" /> in the path × new weight length.</p>
        <p>The number of edges with color <TeX tex="x" /> going out of subtree <TeX tex="u" /> will +1 if the starting point is from subtree <TeX tex="u" />, so we can just +1 to all nodes inside subtree <TeX tex="u" />. Similarly we can do +W for weight sum.</p>
        <p>Distance in the original graph can be found in <TeX tex="O(N \log N)" /> using binary lifting and a DFS. But since we need to add +1 to each node one by one, we need <TeX tex="O(N^2)" /> to do all necessary operations.</p>
      </Spoiler>

      <p>That reduces the problem to <TeX tex="O(N^2)" />, let's optimize it!</p>

      <Spoiler summary="Optimization used">
        <p>Let's find a better way to do the +1 and +W operations. If you've learnt dfn values, you should be able to solve the problem from here. If we let <TeX tex="tin_i" /> be the time we entered subtree <TeX tex="i" /> and <TeX tex="tout_i" /> the time we left subtree <TeX tex="i" />, we need to do +val in a range and find a value at a point — a segment tree.</p>
        <p>We can't declare a new segment tree each time — we need to reuse it, doing −1 and −W operations to revert it (or something like a range set).</p>
      </Spoiler>

      <p>This allows an <TeX tex="O(N \log N)" /> solution.</p>
      <p><a href="https://atcoder.jp/contests/abc133/submissions/48433973" target="_blank" rel="noopener">AC code ↗</a></p>

      <Spoiler summary="Code">
        <pre><code>{CPP_CODE_N1}</code></pre>
      </Spoiler>

      <p>Feel free to ask anything about the task. I will try to respond if I am free.</p>
    </div>
  );
}

Object.assign(window, { ColorfulTreePost });
