import data from '../../content/album';
import Navbar from '../../components/Navbar'
import Header from '../../components/Header'
import Tracks from '../../components/Tracks'
import UserPlaylist from '../../components/Playlist';
import { useSearchResult } from '../../context/useSearchResult';

const Home = () => {
    const { result } = useSearchResult()
    return (
        <div className="App flex flex-col min-h-screen">
            <Navbar />
            {
                result.length === 0 &&
                <Header
                    imageUrl={data.album.images[0].url}
                    albumName={data.album.name}
                />
            }
            <UserPlaylist />
            <Tracks />
            <div className='text-xs bg-gray-800 py-3 text-white'>
                Generasi Gigih Frontend Track Homework by Muhammad Ulil Albab Surya Negara
            </div>
        </div>
    );
}

export default Home;