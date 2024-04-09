// make common query element
const $ = (selector) => document.querySelector(selector);
const root = $("#root");

let store = Immutable.Map({
  marsPhotos: [],
});

const updateAndRender = (state, newState) => {
  store = state.merge(newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
  getMarsPhotos();
};

const renderMarsPhotoItem = (marsPhotos) => {
  return () => {
    if (!marsPhotos.length) {
      return `<h2>The mars photos will appear here!</h2>`;
    }
    return marsPhotos.map((maskPhoto) => {
      return `<a href="#" class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">name: ${maskPhoto.name} - status: ${maskPhoto.status}</h5>
          <small class="text-body-secondary">landing_date: ${maskPhoto.landing_date} - launch_date: ${maskPhoto.launch_date} - max_date: ${maskPhoto.max_date}</small>
        </div>
        <p class="mb-1">total_photos: ${maskPhoto.total_photos}</p>
        <small class="text-body-secondary">And some muted small print.</small>
      </a>`;
    });
  };
};

const App = (state) => {
  const marsPhotos = state.get("marsPhotos");
  return `<div class="list-group">${renderMarsPhotoItem(marsPhotos)()}</div>`;
};

const getMarsPhotos = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/mars-photo`);
    const newState = store.set("marsPhotos", response.data);
    updateAndRender(store, newState);
  } catch (error) {
    return [];
  }
};

window.addEventListener("load", () => {
  render(root, store);
});
