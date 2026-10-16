// blog-post-5.jsx — "Competitive Programming Notes #3: Spreading Black Paint on a Tree"
const TeX = window.TeX;
const Spoiler = window.Spoiler;

const CPP_CODE_N3 = `#include<bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve() {
	int N; cin >> N;
	vector<vector<int>> g(N + 1);
	for (int i = 0; i < N - 1; i++) {
		int u, v; cin >> u >> v;
		g[u].push_back(v); g[v].push_back(u);
	}
	int K; cin >> K;
	vector<int> step(N + 1), f(N + 1), col(N + 1), t(K + 1);
	for (int i = 1; i <= K; i++)
		cin >> t[i];

	function<bool(int, int)> dfs = [&](int u, int fa) {
		for (auto& v : g[u]) {
			if (v == fa) continue; //don't go back up first
			if (dfs(v, u) == 0) return 0;//if some node cannot work return false
			if (!col[v]) f[u] = max(f[u], f[v] + 1); //if it is white, f[u]=max(f[u],f[v]+1) because we can use one more operation done
			//just record maximum
		}
		if (step[u] <= f[u]) {//if we can move down, just move down
			step[u] = 0;//remove that node's steps 
			return 1; //return possible
		}
		if (fa == 0 || col[fa]) return 0; //since my code roots at 1, I set its father to be 0
		//if my father is already colored black or it is the root, return false
		step[fa] = step[u] - 1; step[u] = 0; col[fa] = 1;//or else move up, now your steps would - 1
		return 1;
	};

	auto check = [&](int x) {
		for (int i = 0; i <= N; i++) f[i] = step[i] = col[i] = 0; //clear everything
		for (int i = 1; i <= K; i++) {
			int u = t[i];
			step[u] = (x / K);
			if (i <= x % K) step[u]++;//counting step[i] for each a[i]
			col[u] = 1;
		}
		return dfs(1, 0);
	};
	int l = 0, r = N, ans = -1;
	while (l <= r) {
		int mid = (l + r) >> 1;
		if (check(mid)) { 
			ans = mid; 
			l = mid + 1;
		}
		else {
			r = mid - 1;
		}
	}
	cout << ans << '\\n';
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr); cout.tie(nullptr);

	int T; cin >> T;
	while (T--) {
		solve();
	}
}
`;

function BlackTreePost() {
  return (
    <div className="post-prose">
      <h2>Paraphrased problem</h2>
      <p>Given a tree with <TeX tex="N" /> nodes. Given <TeX tex="K" /> nodes, <TeX tex="a_1,a_2,a_3,...,a_K" />. Initially these nodes are colored black and the remaining are colored white. Operation <TeX tex="X" /> means we move <TeX tex="a_{(X-1) \bmod K + 1}" /> and spread the black color to a neighboring node of our choice — i.e. we move <TeX tex="a_1,a_2,a_3,...,a_K,a_1,a_2,..." />. No node can be colored black twice.</p>

      <Spoiler summary="Prerequisites">
        <p>Binary search, greedy, DFS.</p>
      </Spoiler>

      <Spoiler summary="Hints">
        <p>Binary search on the number of operations done. A check function "can we do <TeX tex="x" /> moves?" must satisfy a true, ..., true, false, ..., false scenario — so we can determine how many times each node must move. How do we check if moving it around is possible?</p>
      </Spoiler>

      <p>Can you continue the problem from here?</p>

      <Spoiler summary="Solution">
        <p>Greedy algorithm: find the maximum number of steps a node can move down with. If it can move down <TeX tex="X" /> steps, move down. If it can't move <TeX tex="X" /> steps down, move up and consider it later.</p>
        <p>The algorithm stops once some nodes are unable to move down or up. Using a DFS ensures every subtree below the current node has already satisfied the conditions, so we only need to consider the current node.</p>
      </Spoiler>

      <Spoiler summary="Code">
        <pre><code>{CPP_CODE_N3}</code></pre>
      </Spoiler>

      <Spoiler summary="Feelings">
        <p>Interesting problem with a very cool implementation.</p>
      </Spoiler>

      <p>Good problem anyway — uses a very simple concept but a very cool implementation.</p>
      <p>Hope you guys learnt something from this blog.</p>
    </div>
  );
}

Object.assign(window, { BlackTreePost });
