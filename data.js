// data.js — content for the site, kept editable

window.SITE_DATA = {
  name: {
    first: "Yong Li",
    last: "Neo",
    alias: "Neo",
  },
  positioning: "Machine learning researcher. Graph neural networks for cell–cell communication and drug discovery.",
  hero_lede_long: "Undergraduate Researcher at Georgia Tech (Zhang Lab), developing graph neural network methods for cell–cell communication and drug discovery. Three IEEE publications on EEG signal classification.",
  location: "Atlanta, GA · open to relocation (US)",
  status: "Available for Research Scientist & Research Internship positions",

  links: {
    email: "yonglineo@gmail.com",
    scholar: "https://scholar.google.com/citations?user=miPGurwAAAAJ&hl=en",
    linkedin: "https://www.linkedin.com/in/ylneo/",
    github: "https://github.com/YLNeooo",
  },

  research_pitch: {
    title_pre: "Graph neural networks for",
    title_em: "cell–cell communication",
    title_post: " and drug discovery.",
    paras: [
      "Current focus: signal-direction prediction in cell–cell communication. Using graph neural networks to model directed interactions between cells from single-cell data, with applications to target identification for drug discovery.",
      "Prior research: three years developing deep learning pipelines (PyTorch, TensorFlow) for EEG signal classification in mental health. Three peer-reviewed IEEE publications.",
    ],
    bullets: [
      { tag: "FOCUS",   text: "GNNs for cell–cell communication and gene regulatory networks" },
      { tag: "METHOD",  text: "Signal-direction inference; foundation-model adaptation for biological simulation" },
      { tag: "PRIOR",   text: "EEG classification for depression, confusion, and seizure detection" },
      { tag: "STACK",   text: "PyTorch, TensorFlow, PyTorch Geometric, scanpy" },
    ],
  },

  publications: [
    {
      year: "2024",
      month: "NOV",
      title: "A Review of State-of-the-Art Machine Algorithms on Classifying Depressive Disorder EEG Signals",
      venue: "IEEE Conference Proceedings",
      tags: [{ label: "Deep Learning", tone: "blue" }, { label: "EEG", tone: "moss" }, { label: "Review", tone: "ochre" }],
      href: "https://scholar.google.com/citations?user=miPGurwAAAAJ&hl=en",
    },
    {
      year: "2023",
      month: "JUN",
      title: "Confused vs Non-Confused Electroencephalography Signal Classification Using Deep Learning Algorithm",
      venue: "IEEE Conference Proceedings",
      tags: [{ label: "Deep Learning", tone: "blue" }, { label: "EEG", tone: "moss" }, { label: "Classification", tone: "rust" }],
      href: "https://scholar.google.com/citations?user=miPGurwAAAAJ&hl=en",
    },
    {
      year: "2022",
      month: "DEC",
      title: "Epileptic Seizure Electroencephalography Signal Classification Using Machine Learning Algorithm",
      venue: "IEEE Conference Proceedings",
      tags: [{ label: "Machine Learning", tone: "blue" }, { label: "EEG", tone: "moss" }, { label: "Seizure", tone: "rust" }],
      href: "https://scholar.google.com/citations?user=miPGurwAAAAJ&hl=en",
    },
  ],

  projects: [
    {
      title: "Signal-direction prediction in cell–cell communication",
      sub: "Graph neural network architectures for directed interaction inference on single-cell data. Independent research under Zhang Lab.",
      date: "2026 — Present",
      tags: [{ label: "GNN", tone: "blue" }, { label: "scRNA-seq", tone: "moss" }, { label: "PyTorch", tone: "ochre" }],
      status: "In progress",
    },
    {
      title: "Gene regulatory network inference",
      sub: "GRN inference and single-cell data simulation using foundation models. Computational Biology group, Zhang Lab.",
      date: "2026 — Present",
      tags: [{ label: "GRN", tone: "blue" }, { label: "Foundation Models", tone: "moss" }],
      status: "In progress",
    },
    {
      title: "EEG depression classification",
      sub: "Three-year deep learning pipeline (PyTorch, TensorFlow) achieving state-of-the-art accuracy, recall, and AUC on EEG depression biomarkers.",
      date: "2022 — 2024",
      tags: [{ label: "PyTorch", tone: "blue" }, { label: "TensorFlow", tone: "ochre" }, { label: "EEG", tone: "moss" }],
      status: "Published ×3",
    },
    {
      title: "National Olympiad in Informatics",
      sub: "Problem design across graph theory, dynamic programming, and combinatorics. Specification writing and stress-testing.",
      date: "Ongoing",
      tags: [{ label: "Algorithms", tone: "rust" }, { label: "Graph Theory", tone: "blue" }],
      status: "Active",
    },
  ],

  experience: [
    {
      role: "Undergraduate Researcher",
      org: "Georgia Institute of Technology",
      group: "Zhang Lab, Computational Biology",
      when: "Jan 2026 — Present",
      live: true,
      body: "Independent research under Associate Prof. Xiuwei Zhang. Developing graph neural network methods for signal-direction prediction in cell–cell communication. Supported by the President's Undergraduate Research Award.",
      tags: [{ label: "GNN", tone: "blue" }, { label: "scRNA-seq", tone: "moss" }],
    },
    {
      role: "Research Assistant",
      org: "Georgia Institute of Technology",
      group: "Zhang Lab, Computational Biology",
      when: "Jan 2026 — Present",
      live: true,
      body: "Gene regulatory network inference, GNN implementation, and single-cell data simulation using foundation models.",
      tags: [{ label: "GRN", tone: "blue" }, { label: "Simulation", tone: "ochre" }],
    },
    {
      role: "Problem Setter",
      org: "National Olympiad in Informatics",
      group: "Competitive programming",
      when: "Ongoing",
      live: false,
      body: "Problem design across graph theory, dynamic programming, and combinatorics. Specification and stress-testing for national-level competition.",
      tags: [{ label: "Algorithms", tone: "rust" }],
    },
    {
      role: "Independent Researcher",
      org: "EEG signal classification",
      group: "Three IEEE publications",
      when: "2022 — 2024",
      live: false,
      body: "End-to-end deep learning pipelines (PyTorch, TensorFlow) for EEG classification in mental health: depression, confusion, and epileptic seizure detection.",
      tags: [{ label: "EEG", tone: "moss" }, { label: "Deep Learning", tone: "blue" }],
    },
  ],

  education: [
    {
      role: "B.S., Computer Science",
      org: "Georgia Institute of Technology",
      group: "Threads: Intelligence + Theory (anticipated)",
      when: "Expected 2028",
      live: false,
      body: "Coursework in machine learning, algorithms, linear algebra, and computational biology.",
      tags: [],
    },
  ],

  awards: [
    {
      year: "2026",
      title: "President's Undergraduate Research Award",
      org: "Georgia Institute of Technology",
      note: "Research funding for the cell–cell communication project under the Zhang Lab.",
    },
    {
      year: "2024",
      title: "IEEE Conference Publication",
      org: "Institute of Electrical and Electronics Engineers",
      note: "Review of state-of-the-art machine algorithms for depression EEG classification.",
    },
    {
      year: "2023",
      title: "IEEE Conference Publication",
      org: "Institute of Electrical and Electronics Engineers",
      note: "Confused vs. non-confused EEG signal classification.",
    },
    {
      year: "2022",
      title: "IEEE Conference Publication",
      org: "Institute of Electrical and Electronics Engineers",
      note: "Epileptic seizure EEG signal classification.",
    },
  ],

  skills: [
    {
      group: "Languages",
      items: ["Python", "C / C++", "Java", "JavaScript", "MATLAB"],
    },
    {
      group: "ML / DL frameworks",
      items: ["PyTorch", "TensorFlow", "PyTorch Geometric", "scikit-learn", "JAX (learning)"],
    },
    {
      group: "Computational biology",
      items: ["scanpy", "AnnData", "Single-cell pipelines", "GRN inference", "Foundation-model adaptation"],
    },
    {
      group: "Research toolkit",
      items: ["NumPy / Pandas", "Matplotlib / Seaborn", "Jupyter", "Git / GitHub", "LaTeX"],
    },
  ],

  posts: [
    {
      title: "From EEG to single-cell: methodological transfer",
      desc: "Lessons from three years of EEG that carry over to single-cell analysis: signal noise, ablations, and evaluation discipline.",
      tags: [{ label: "Research", tone: "blue" }, { label: "Reflection", tone: "moss" }],
      status: "draft",
      date: "Coming soon",
    },
    {
      title: "Depression diagnosis from EEG signals",
      desc: "Summary of a three-year research program: preprocessing, CNN–LSTM hybrids, and recall–AUC trade-offs in clinical classification.",
      tags: [{ label: "Deep Learning", tone: "blue" }, { label: "Neuroscience", tone: "moss" }, { label: "IEEE", tone: "ochre" }],
      status: "published",
      date: "2024",
      href: "https://scholar.google.com/citations?user=miPGurwAAAAJ&hl=en",
    },
    {
      title: "Problem design for competitive programming",
      desc: "On writing problems that distinguish top performers: stress-testing strategy, anti-cheese cases, and specification discipline.",
      tags: [{ label: "Algorithms", tone: "rust" }, { label: "Graph Theory", tone: "blue" }],
      status: "draft",
      date: "Coming soon",
    },
    {
      title: "Research workflow: lessons from EEG",
      desc: "Reproducibility, dataset versioning, and the workflow that supported a thesis-length project.",
      tags: [{ label: "PyTorch", tone: "blue" }, { label: "MLOps", tone: "ochre" }, { label: "Research", tone: "moss" }],
      status: "draft",
      date: "Coming soon",
    },
  ],
};
