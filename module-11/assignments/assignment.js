const clientId = `1ac309e7a1b24e46ae01827ecd1e3a64`;
const clientSecret = `cd6db43048a04632a34b73a3f65d9171`;

let _data = [];

const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });
    const data = await result.json();

    return data.access_token;
};

const getGenres = async (token) => {
    const result = await fetch("https://api.spotify.com/v1/browse/categories", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const data = await result.json();
    return data.categories.items;
};

const getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await fetch(
        `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        }
    );

    const data = await result.json();
    return data.playlists.items;
};

const getTracksFromPlaylist = async (token, tracksUrl) => {
    const limit = 5;

    const result = await fetch(tracksUrl + `?limit=${limit}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
    });

    const data = await result.json();
    return data.items;
};

const loadGenres = async () => {
    const token = await getToken();
    const genres = await getGenres(token);

    _data = await Promise.all(
        genres.map(async (genre) => {
            let playlists = await getPlaylistByGenre(token, genre.id);
            playlists = await Promise.all(playlists.map(async (playlist) => {
                const playlistTracks = await getTracksFromPlaylist(token, playlist.tracks.href);
                return { ...playlist, playlistTracks };
            }));

            return { ...genre, playlists };
        })
    );
};

const renderGenres = (filterTerm) => {
    let source = _data;

    if (filterTerm) {
        const term = filterTerm.toLowerCase();
        source = source.filter(({ name }) => {
            return name.toLowerCase().includes(term);
        });
    }

    const list = document.getElementById("genres");
    list.innerHTML = "";
    const opt_genres = document.getElementById("opt_genres").checked;
    const opt_tracklists = document.getElementById("opt_tracklists").checked;
    const opt_all = document.getElementById("opt_all").checked;

    source.map(({ name, icons: [icon], playlists }) => {

        if (playlists.length) {
            let playlistsList = '';

            if (opt_tracklists || opt_all) {

                if (opt_all) {
                    playlists = playlists.slice(0, 9);
                }
                playlistsList = playlists
                    .map(({ name, external_urls: { spotify }, images: [image], playlistTracks }) =>
                        buildPlaylist(name, spotify, image.url, playlistTracks, opt_all))
                    .join("");
                playlistsList = `<ol class="playlists">${playlistsList}</ol>`;
            }

            const article_class = opt_genres ? 'genre_no_playlists' : 'genre_with_playlists';

            const html = `
            <article class="${article_class}">
                <div>
                    <h2>${name}</h2>
                    <img src="${icon.url}" width="${icon.width}" height="${icon.height}" alt="${name}"/>
                </div>
                ${playlistsList}
            </article>`;

            list.insertAdjacentHTML("beforeend", html);

        }
    });
}

const buildPlaylist = (playlist_name, playlist_url, playlist_image_url, playlistTracks, opt_all) => {
    let tracksList = '';
    const tracksListHtml = opt_all ? `<li class="playlist_with_tracks">` : `<li class="playlist_no_tracks">`;

    if (playlistTracks && opt_all) {
        tracksList = playlistTracks
            .map(({ track }) => {
                const artists = track.artists
                    .map(({ name }) => name)
                    .join(', ');
                return `<li class="track">${track.name} - ${artists}</li>`
            })
            .join('');
        tracksList = `<ol class="tracks">${tracksList}</ol>`;
    }

    return tracksListHtml + `
        <a href="${playlist_url}" target="_blank">
            <img src="${playlist_image_url}" width="180" height="180" alt="${playlist_name}"/>
        </a>
        ${tracksList}
    </li>`;
}

loadGenres().then(renderGenres);

const onSubmit = (event) => {
    event.preventDefault();
    const term = event.target.term.value;
    renderGenres(term);
};

const onReset = () => {
    document.getElementById("opt_all").checked = true;
    renderGenres();
};