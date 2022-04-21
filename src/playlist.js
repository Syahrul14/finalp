import React from 'react'

const Dataku = ({ image, title, albums, artists }) => {
    return (
        <div className='container'>
            <img className='playlist-image' src={image} alt='album' />
            <div className='playlist-content'>
                <h1 className='playlist-artist'>{artists}</h1>
                <h4 className='playlist-album'>{albums}</h4>
                <h3 className='playlist-title'>{title}</h3>
                <button type="button" className="playlist-action"> Select </button>
            </div>

        </div>
    );
}

export default Dataku;