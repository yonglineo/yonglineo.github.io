// project-moviesstore.jsx — "GT Movies Store" project write-up

const MS_SETTINGS = `import os
from pathlib import Path

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'moviesstore/templates')],
        'APP_DIRS': True,
        # ...unchanged
    },
]

STATICFILES_DIRS = [
    BASE_DIR / 'moviesstore/static/',
]`;

const MS_BASE_HTML = `{% load static %}
<!doctype html>
<html>
<head>
  <title>{{ template_data.title }}</title>
  <link rel="stylesheet" href="{% static 'css/style.css' %}">
</head>
<body>
  <nav class="navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="{% url 'home.index' %}">
      <img src="{% static 'img/logo.png' %}" height="40" alt="logo">
    </a>
    <a class="nav-link" href="{% url 'home.about' %}">About</a>
  </nav>

  {% block content %}{% endblock content %}

  <footer class="ms-footer">…</footer>
</body>
</html>`;

const MS_VIEWS = `def index(request):
    template_data = {}
    template_data['title'] = 'Movies Store'
    return render(request, 'home/index.html', {'template_data': template_data})

def about(request):
    template_data = {}
    template_data['title'] = 'About'
    return render(request, 'home/about.html', {'template_data': template_data})`;

const MS_CHILD_TEMPLATE = `{% extends 'base.html' %}
{% block content %}
  <header class="masthead bg-index text-white text-center py-4">
    <h2>Movies Store</h2>
    <p>Your ticket to unlimited entertainment.</p>
  </header>
{% endblock content %}`;

// All 21 required user stories, each mapped to the screen/feature that implements it.
const STORIES = [
  { role: "User", text: "See information about the GT Movies Store to learn more about the app and its purpose.", screen: "Home / About" },
  { role: "User", text: "Register an account to access the GT Movies Store.", screen: "Register" },
  { role: "User", text: "Log in to access my account data.", screen: "Log in" },
  { role: "User", text: "View the list of movies available in the store to make selections.", screen: "Catalog" },
  { role: "User", text: "Search movies by title to make selections.", screen: "Catalog · search" },
  { role: "User", text: "Access a shopping cart to list movie items I intend to purchase.", screen: "Cart" },
  { role: "User", text: "Add one or more items of a movie to my cart to purchase later.", screen: "Movie detail → Cart" },
  { role: "User", text: "Create movie reviews so others can use my insights.", screen: "Movie detail · reviews" },
  { role: "User", text: "Remove all items from my cart for flexibility on what I purchase.", screen: "Cart · clear" },
  { role: "User", text: "Edit my reviews to change my mind.", screen: "Movie detail · reviews" },
  { role: "User", text: "Delete my movie reviews to change my mind.", screen: "Movie detail · reviews" },
  { role: "User", text: "See the reviews of a movie to decide whether to purchase it.", screen: "Movie detail · reviews" },
  { role: "User", text: "See the details of a movie to inform my choice.", screen: "Movie detail" },
  { role: "User", text: "See a list of my orders to track purchases and expenses.", screen: "Order history" },
  { role: "User", text: "Access the store from any desktop browser, anywhere with an internet connection.", screen: "Deployment (PythonAnywhere)" },
  { role: "User", text: "Use a responsive GUI across different devices and screen sizes.", screen: "Global layout (Bootstrap grid)" },
  { role: "Admin", text: "Manage (view, create, update, delete) users to keep information up to date.", screen: "Admin back office" },
  { role: "Admin", text: "Manage (view, create, update, delete) movies to keep information up to date.", screen: "Admin back office" },
  { role: "Admin", text: "Manage (create, update, delete) reviews to keep information up to date.", screen: "Admin back office" },
  { role: "Admin", text: "Manage (create, update, delete) orders to keep information up to date.", screen: "Admin back office" },
  { role: "User", text: "Report inappropriate reviews so the comment section stays clean.", screen: "Movie detail · review report" },
];

function StoryRow({ s }) {
  return (
    <div className="story-row">
      <span className="story-role">{s.role}</span>
      <span className="story-text">{s.text}</span>
      <span className="story-screen">▸ {s.screen}</span>
    </div>
  );
}

function MoviesStoreProjectPost() {
  return (
    <div className="post-prose">
      <h3 id="intro">Introduction</h3>
      <p>My name is Yong Li Neo. I am a Computer Science undergraduate from Georgia Tech. GT Movies Store is the first project in a web development class. This is a complete Django-based movie rental storefront, from routing and templating all the way to accounts, reviews, shopping cart, orders, and admin back office, finally getting deployed to PythonAnywhere. The following pages serve as the written counterpart to the submission.</p>

      <h3 id="overview">Project description — GT Movies Store</h3>
      <p>Two roles: one role of a buyer who does catalog browsing, product searching, reading and writing of reviews, and cart and order history management; and another of an administrator who enjoys all CRUD actions on users, movies, reviews, and orders from the back office. All 21 user stories are implemented in the code and they are listed below in a table:</p>
      <div style={{ marginTop: 8 }}>
        {STORIES.map((s, i) => <StoryRow key={i} s={s} />)}
      </div>
      <p style={{ marginTop: 14 }}>Since the GUI has been created using the Bootstrap grid system, which is responsive, the same templates can be scaled down from the desktop size to the mobile size, and thus, the app will be accessible through any modern desktop browser after deployment – fulfilling the two cross-cutting themes (responsive GUI, browser anywhere access).</p>

      <h3 id="process">Process description</h3>
      <p>Work was not done in a single sitting; instead, each sitting involved one or two user stories, with implementation, bug-finding, and testing against the working application based on the chapter in <em>Django 5 for the Impatient</em> (Correa &amp; Lim). The sessions were divided naturally in this way and each video of the logbook shows one complete unit of functionality (from design decision through code, debugging, and testing).</p>
      <p>If there was any ambiguity about how to approach certain things, the sources of information referred to were first of all the chapter of the textbook related to it and then the official documentation of Django. In addition to that, project-related issues could be discussed on Stack Overflow or GitHub. Note that no AI coding was used as part of the project because of restrictions on allowed resources.</p>
      <p>The testing was rather manual and continuous: once we finished working on each story (or chapter), the sequence of actions (for example, adding an item to the cart, checking it, and then deleting it from there) was verified through the browser. The final round of testing was done after the deployment of the app via PythonAnywhere.</p>

      <h3 id="demo">Video demonstration</h3>
      <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", border: "1px solid var(--rule-color-strong)", borderRadius: 2, overflow: "hidden" }}>
        <iframe
          src="https://drive.google.com/file/d/1FljtrK1a4kzCTg4zmvSozYNeDwR-n3Z-/preview"
          allow="autoplay"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

Object.assign(window, { MoviesStoreProjectPost });
