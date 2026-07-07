// Project data + tracks
const PROJECTS = [
  { name: "fankee.com", desc: "Fan-engagement platform — full-stack product & infra", lang: "TypeScript", year: "2026", priv: "Live", tag: "fullstack", url: "https://fankee.com", live: true },
  { name: "hugel.fankee.com", desc: "HUGEL artist experience, built on Fankee", lang: "TypeScript", year: "2025", priv: "Live", tag: "fullstack", url: "https://hugel.fankee.com", live: true },
  { name: "davidguetta.fankee.com", desc: "David Guetta artist experience, built on Fankee", lang: "TypeScript", year: "2025", priv: "Live", tag: "fullstack", url: "https://davidguetta.fankee.com", live: true },
  { name: "mia-platform/design-system", desc: "Open-source React design system — contributor", lang: "TypeScript", year: "2024", priv: "Public", tag: "frontend", url: "https://github.com/mia-platform/design-system" },
  { name: "Rag-Chatbot-Eloquent-AI", desc: "Retrieval-augmented chatbot prototype", lang: "TypeScript", year: "2025", priv: "Public", tag: "ai" },
  { name: "fankee-code-challenge", desc: "Magic-link auth & augmented profile system", lang: "TypeScript", year: "2024", priv: "Public", tag: "fullstack" },
  { name: "Abbot", desc: "Advanced UI publication 2017–2018", lang: "Python", year: "2024", priv: "Public", tag: "research" },
  { name: "bubbles", desc: "Bubble layout UI visualization", lang: "TypeScript", year: "2024", priv: "Public", tag: "frontend" },
  { name: "curriculum", desc: "Personal CV system", lang: "JavaScript", year: "2023", priv: "Private", tag: "frontend" },
  { name: "video-manager", desc: "Stream and organize video files in folders", lang: "TypeScript", year: "2023", priv: "Public", tag: "fullstack" },
  { name: "Room-Planner-WebGL", desc: "Room planner graphic engine", lang: "JavaScript", year: "2023", priv: "Public", tag: "graphics" },
  { name: "Room-Planner", desc: "3D room planner — computer graphics", lang: "JavaScript", year: "2023", priv: "Public", tag: "graphics" },
  { name: "game-of-life", desc: "Conway's game of life", lang: "JavaScript", year: "2021", priv: "Private", tag: "graphics" },
  { name: "custom-plugin-lib", desc: "Mia-Platform custom plugin library (fork)", lang: "JavaScript", year: "2021", priv: "Public", tag: "frontend" },
  { name: "Neural-Scene-Rendering", desc: "Multi-camera scene reconstruction", lang: "Python", year: "2020", priv: "Public", tag: "ai" },
  { name: "Scene-Reconstruction", desc: "Multiple camera views of an animated object via Blender", lang: "Python", year: "2020", priv: "Public", tag: "graphics" },
  { name: "3d_room", desc: "Computer animation & data visualization", lang: "Python", year: "2020", priv: "Public", tag: "graphics" },
  { name: "Style-Transfer-gatys-enhancement", desc: "JiaoTong University computer vision project", lang: "Jupyter", year: "2020", priv: "Public", tag: "ai" },
  { name: "siamfc-object-tracking", desc: "Real-time object tracking via siamese fully convolutional net", lang: "Python", year: "2019", priv: "Public", tag: "ai" },
  { name: "Abbot-ino", desc: "Arduino prototypes for Abbot study", lang: "C++", year: "2019", priv: "Public", tag: "research" },
  { name: "Abbot-app", desc: "Swift iPad application for Abbot devices", lang: "Swift", year: "2019", priv: "Public", tag: "research" },
  { name: "Machine-Learning-Project-2018-2019", desc: "Fashion-MNIST classification with multiple methods", lang: "Jupyter", year: "2019", priv: "Public", tag: "ai" },
  { name: "video-completion", desc: "Generation of stabilised video missing parts", lang: "Python", year: "2019", priv: "Public", tag: "ai" },
  { name: "Person-height", desc: "Compute a person's height from a photo with reference object", lang: "Python", year: "2019", priv: "Public", tag: "graphics" },
  { name: "Stereopsis-correlation", desc: "Depth map estimation via correlation", lang: "Python", year: "2019", priv: "Public", tag: "graphics" },
  { name: "Travlendar-plus", desc: "Software engineering 2 project", lang: "—", year: "2017", priv: "Public", tag: "frontend" },
  { name: "Lorenzo-il-Magnifico", desc: "Final project — board-game implementation", lang: "Java", year: "2017", priv: "Public", tag: "frontend" },
];

const TRACKS = [
  { title: "Planet Caravan", artist: "Black Sabbath", duration: 272, featured: true,
    itunes: "Black Sabbath Planet Caravan",
    spotify: "https://open.spotify.com/search/Black%20Sabbath%20Planet%20Caravan" },
  { title: "Tu Non Mi Basti Mai", artist: "Lucio Dalla", duration: 252,
    itunes: "Lucio Dalla Tu Non Mi Basti Mai",
    spotify: "https://open.spotify.com/search/Lucio%20Dalla%20Tu%20Non%20Mi%20Basti%20Mai" },
  { title: "Breathe", artist: "The Prodigy", duration: 335,
    itunes: "The Prodigy Breathe",
    spotify: "https://open.spotify.com/search/The%20Prodigy%20Breathe" },
  { title: "Utrus Horas", artist: "Orchestra Baobab", duration: 357,
    itunes: "Orchestra Baobab Utrus Horas",
    spotify: "https://open.spotify.com/search/Orchestra%20Baobab%20Utrus%20Horas" },
  { title: "The Graefe Escape", artist: "Onirik", duration: 372,
    itunes: "Onirik The Graefe Escape",
    spotify: "https://open.spotify.com/search/Onirik%20The%20Graefe%20Escape" },
];

const SERVICES = [
  { name: "Engineering", desc: "Building robust full-stack systems — from data layer to UI. TypeScript, Node, React, infra." },
  { name: "Coding", desc: "Crafting clean, maintainable code as a product. Pairing, reviews, refactoring legacy stacks." },
  { name: "Design", desc: "Interfaces with intent — type, grid, and motion. Turning rough ideas into clear visual systems." },
  { name: "Prototyping", desc: "Fast, functional prototypes to test an idea in the browser before committing to the build." },
];

const IG_POSTS = [
  "https://www.instagram.com/p/C8j9mkmIvY_/",
  "https://www.instagram.com/p/DJ-UxFbK17r/",
  "https://www.instagram.com/p/DJ-Xr-WKEfS/",
  "https://www.instagram.com/p/DJ-WTmBqEks/",
  "https://www.instagram.com/p/DJ-VZReqRsk/",
  "https://www.instagram.com/p/DJ-SSZ7qErz/",
  "https://www.instagram.com/p/DGeWVHyKZxF/",
  "https://www.instagram.com/p/C9dey0mImPj/",
];

window.PROJECTS = PROJECTS;
window.TRACKS = TRACKS;
window.SERVICES = SERVICES;
window.IG_POSTS = IG_POSTS;

// Tools & stack extracted from the CV, grouped editorially
const TOOL_GROUPS = [
  { label: "Languages", items: [
    { name: "TypeScript", file: "TS.png", url: "https://www.typescriptlang.org" },
    { name: "JavaScript", file: "JS.png", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Python", file: "Python.png", url: "https://www.python.org" },
    { name: "Java", file: "Java.png", url: "https://www.java.com" },
    { name: "Swift", file: "Swift.png", url: "https://www.swift.org" },
  ]},
  { label: "Front-end", items: [
    { name: "React", file: "ReactJS.png", url: "https://react.dev" },
    { name: "Next.js", file: "NextJS.svg", url: "https://nextjs.org" },
    { name: "Redux", file: "ReduxJS.png", url: "https://redux.js.org" },
    { name: "Tailwind CSS", file: "Tailwind.svg", url: "https://tailwindcss.com" },
    { name: "Ant Design", file: "Ant.png", url: "https://ant.design" },
    { name: "MUI", file: "Mui.png", url: "https://mui.com" },
    { name: "StencilJS", file: "StencilJS.png", url: "https://stenciljs.com" },
    { name: "Storybook", file: "Storybook.png", url: "https://storybook.js.org" },
    { name: "Figma", file: "Figma.png", url: "https://www.figma.com" },
  ]},
  { label: "Back-end & Data", items: [
    { name: "Node.js", file: "NodeJS.png", url: "https://nodejs.org" },
    { name: "Fastify", file: "Fastify.png", url: "https://fastify.dev" },
    { name: "GraphQL", file: "GraphQL.png", url: "https://graphql.org" },
    { name: "Relay", file: "Relay.png", url: "https://relay.dev" },
    { name: "Supabase", file: "Supabase.svg", url: "https://supabase.com" },
    { name: "MongoDB", file: "MongoDB.png", url: "https://www.mongodb.com" },
    { name: "Postgres", file: "Postgres.svg", url: "https://www.postgresql.org" },
  ]},
  { label: "Cloud & Tooling", items: [
    { name: "Docker", file: "Docker.png", url: "https://www.docker.com" },
    { name: "Kubernetes", file: "Kubernetes.png", url: "https://kubernetes.io" },
    { name: "Vercel", file: "Vercel.svg", url: "https://vercel.com" },
    { name: "GitLab", file: "Gitlab.png", url: "https://gitlab.com" },
    { name: "Playwright", file: "Playwright.png", url: "https://playwright.dev" },
    { name: "Jest", file: "Jest.png", url: "https://jestjs.io" },
  ]},
  { label: "AI & ML", items: [
    { name: "Claude", file: "Claude.svg", url: "https://www.anthropic.com/claude" },
    { name: "Codex", file: "OpenAI.svg", url: "https://openai.com/codex/" },
    { name: "PyTorch", file: "Pytorch.png", url: "https://pytorch.org" },
    { name: "TensorFlow", file: "Tensorflow.png", url: "https://www.tensorflow.org" },
    { name: "Keras", file: "Keras.svg", url: "https://keras.io" },
    { name: "scikit-learn", file: "ScikitLearn.png", url: "https://scikit-learn.org" },
    { name: "Pandas", file: "Pandas.svg", url: "https://pandas.pydata.org" },
  ]},
  { label: "Graphics", items: [
    { name: "OpenCV", file: "OpenCV.png", url: "https://opencv.org" },
    { name: "Blender", file: "Blender.png", url: "https://www.blender.org" },
    { name: "WebGL", file: "WebGL.png", url: "https://www.khronos.org/webgl/" },
  ]},
  { label: "Prototypes", items: [
    { name: "Arduino Nano", file: "Arduino.png", url: "https://www.arduino.cc" },
    { name: "Raspberry Pi", file: "RaspberryPi.png", url: "https://www.raspberrypi.com" },
  ]},
  { label: "Media", items: [
    { name: "Final Cut Pro", file: "FinalCut.png", url: "https://www.apple.com/final-cut-pro/" },
    { name: "Premiere Pro", file: "Premiere.png", url: "https://www.adobe.com/products/premiere.html" },
    { name: "Photoshop", file: "Photoshop.png", url: "https://www.adobe.com/products/photoshop.html" },
    { name: "Lightroom", file: "Lightroom.png", url: "https://www.adobe.com/products/photoshop-lightroom.html" },
  ]},
];

const CV_INFO = [
  {
    company: "Fankee",
    logo: "Fankee-badge.png",
    role: "Founding Engineer",
    period: "2024 — Now",
    points: [
      "Designed and built <b>fan engagement platforms</b> on behalf of famous artists (<b>HUGEL, David Guetta</b>).",
      "<b>End-to-end ownership</b> of a media-intensive platform serving <b>10k+ users</b>.",
      "Designed and built a <b>progressive web app</b> and website that stream music and let fans <b>buy shares of a song</b>.",
      "Feature design and implementation <b>end to end</b>, owning the <b>architectural decisions</b>.",
      "Managing <b>external software houses</b>, teams and <b>freelancers</b> — choosing the <b>right tools</b> and aligning the partner companies' teams.",
      "Currently prototyping the <b>native mobile app</b>.",
    ],
  },
  {
    company: "Mia-Platform",
    logo: "Mia-Platform-2x.png",
    role: "Full-Stack Developer · Expert",
    period: "2020 — 2024",
    points: [
      "Product team building a <b>digital integration hub</b> — <b>microservices</b>, composable architectures, <b>Kubernetes</b>.",
      "<b>Maintainer</b> of the open-source <b>design-system component library</b> (Storybook, Figma design tokens).",
      "Led platform <b>themification (dark mode)</b> and a <b>modular back office</b> — microfrontends, Web Components, StencilJS.",
      "<b>Managed and mentored</b> less-experienced developers on the team.",
    ],
  },
  {
    company: "Shanghai Jiao Tong",
    logo: "JiaoTong-2x.png",
    role: "Researcher",
    period: "2018 — 2019",
    points: [
      "Digital Media & Data Reconstruction Lab — <b>neural scene rendering</b> from multi-depth-camera capture.",
      "<b>Variational autoencoders</b> and volumetric raytracing (PyTorch, Blender). <b>GPA 3.76 / 4.0</b>.",
    ],
  },
  {
    company: "Politecnico di Milano",
    logo: "Politecnico-2x.png",
    role: "MSc Computer Science Engineering",
    period: "2014 — 2020",
    points: [
      "Master <b>109/110</b> · Bachelor <b>99/110</b>.",
      "Thesis — <b>Neural Scene Rendering</b>: reconstructing novel viewpoints of realistic 3D scenes.",
    ],
  },
];

window.TOOL_GROUPS = TOOL_GROUPS;
window.CV_INFO = CV_INFO;

const DOCS = [
  {
    title: "Neural Scene Rendering",
    kind: "MSc Thesis · Politecnico di Milano",
    year: "2020",
    desc: "Reconstructing novel viewpoints of realistic 3D scenes captured with multiple depth cameras.",
    file: "assets/docs/Giovanni-Tommasi-Thesis.pdf",
    action: "Download PDF",
  },
  {
    title: "Abbot",
    kind: "Publication · AVI 2018",
    year: "2018",
    desc: "<b>Acceptance paper for the International Conference on Advanced Visual Interfaces</b> — an exploratory study with 160 children.",
    file: "assets/docs/Giovanni-Tommasi-Abbot-AVI-2018.pdf",
    action: "Download PDF",
  },
  {
    title: "Google Hash Code 2022",
    kind: "Competition · Gophing Around",
    year: "2022",
    desc: "99th worldwide — 3,360,259 points, with a peak of 26th one hour before the end.",
    href: "https://github.com/Gophing-Around/qualification-round-2022",
    action: "View team",
  },
];

window.DOCS = DOCS;
