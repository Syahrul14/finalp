import { useState } from "react";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import { useStoreApi } from "../../context/useStoreApi";
import { useSearchResult } from "../../context/useSearchResult";
import Track from "../../components/Track";

const CreatePlaylist = () => {
    const { axios } = useStoreApi()
    const { selectedSongs, setSelectedSongs, setResult } = useSearchResult()
    const [playlistForm, setPlaylistForm] = useState({
        title: '',
        description: '',
    })

    const [errors, setErrors] = useState({
        title: false
    })

    const handleFormChange = (e) => {
        setPlaylistForm({
            ...playlistForm,
            [e.target.name]: e.target.value
        })
    }


    const fetchUserData = async () => {
        try {
            const response = await axios.get('/me')
            if (response) {
                return response?.data?.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createPlaylist = async (id) => {
        try {
            const response = await axios.post(`/users/${id}/playlists`, {
                name: playlistForm.title,
                public: false,
                collaborative: false,
                description: playlistForm.description,
            })
            if (response) {
                return response?.data?.id
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addSongsToPlaylist = async (playlistId) => {
        try {
            const response = await axios.post(`/playlists/${playlistId}/tracks`, {
                uris: selectedSongs.map((song) => song.uri)
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        if (playlistForm.title.length < 10) return setErrors({ ...errors, title: true })
        try {
            const id = await fetchUserData()
            const playlistId = await createPlaylist(id)
            if (playlistId) {
                const response = await addSongsToPlaylist(playlistId)
                if (response) {
                    setPlaylistForm({
                        title: '',
                        description: '',
                    })
                    setSelectedSongs([])
                    setResult([])
                    alert('Playlist is created!')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Navbar />
            <section className="bg-gray-800 py-8 min-h-screen">
                <Container>
                    <h1 className="text-xl font-bold text-white">
                        Create New Playlist
                    </h1>
                    <section className="mt-2">
                        {
                            selectedSongs
                                .map((song, idx) => {
                                    return (
                                        <Track
                                            key={song.uri}
                                            number={idx}
                                            title={song.name}
                                            artist={song.artists[0].name}
                                            album={song.album.name}
                                            uri={song.uri}
                                        />
                                    )
                                }
                                )
                        }
                    </section>
                    <form onSubmit={handleCreatePlaylist}>
                        <div className="my-4 text-white">
                            <div className="flex flex-col items-start mb-3">
                                <label htmlFor="playlistTitle" className="block mb-2">Playlist Title</label>
                                <input name="title" id="playlistTitle" className="block p-2 rounded w-full text-black" value={playlistForm.title} onChange={handleFormChange} />
                                {
                                    errors.title &&
                                    <span className='text-xs mt-2 text-red-400'>Title's length must be at least 10 character</span>
                                }
                            </div>
                            <div className="flex flex-col items-start mb-3">
                                <label htmlFor="playlistDescription" className="block mb-2">Playlist Description</label>
                                <textarea name="description" id="playlistDescription" className="block p-2 rounded w-full text-black" value={playlistForm.description} onChange={handleFormChange} />
                            </div>
                        </div>
                        <button className="py-2 px-4 bg-green-500 rounded-full w-full mt-3 block" type="submit">
                            Create Playlist
                        </button>
                    </form>
                </Container>
            </section>
        </>
    )
}

export default CreatePlaylist;