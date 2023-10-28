import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import './NewAlbum.css'
import { makeNewAlbum, makeNewSong, getAlbum, getSongsOnAlbum } from "../../store/music";
import * as sessionActions from '../../store/session';

const NewAlbum = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [formVal, setFormVal] = useState([{name:'', url:'', isExplicit: false}])
    const [checked, setChecked] = useState([])
    const [albumName, setAlbumName]= useState('')
    const [albumPicture, setAlbumPicture]= useState('')
    const [albumIsExplicit, setAlbumIsExplicit]= useState(false)
    const [isArt, setIsArt] = useState(false)
    const [errors, setErrors] = useState({})
    const [on, setOn] = useState(true)



    const isArtist = useSelector((state) => state.session.artist)
    const user = useSelector((state) => state.session.user)
    useEffect(() => {
        if(user){
        dispatch(sessionActions.isArtist(user.id))
    }
    },[dispatch, user])

    useEffect(() => {
        if (user && isArtist) setIsArt(true)
    }, [user, isArtist])



    const albumCheck = () => {
        if (albumIsExplicit === false) setAlbumIsExplicit(true)
        else setAlbumIsExplicit(false)
    }

    const addRow = () => {
        setFormVal([...formVal, {name:'', url:'', isExplicit: false}])
    }
    const onRemove = (i) => {
        const newForm = [...formVal]
        newForm.splice(i, 1)
        setFormVal(newForm)
    }
    const onHandle = (e, i) => {
        let newForm = [...formVal]
        newForm[i][e.target.name] = (e.target.value)
        setFormVal(newForm)
    }
    const onCheck = (e, i) => {
        if(checked.includes(i)){
            let index = checked.indexOf(i)
            let newCheck = checked.splice(i, 1)
            setChecked(newCheck)
            let newForm = [...formVal]
            newForm[i].isExplicit = false
            setFormVal(newForm)
        } else {
            let newCheck = [...checked, i]
            setChecked(newCheck)
            let newForm = [...formVal]
            newForm[i].isExplicit = true
            setFormVal(newForm)

        }
    }



    const songValidation = (formVal) => {
        const data = [...formVal]
        let valid = true
        for (let i = 0; i < data.length; i++){
            // const el = array[i]

            if(data[i].name === '' ){
                data[i].nameCheck = 'Song name required'
                valid = false
            } else if (data[i].name.length < 2){
                console.log(data)
                data[i].nameCheck = 'Song Name must be 2 character or longer'
                console.log('here',data[i].name.length,data[i].name)
                valid = false
            } else {
                data[i].nameCheck = ''
            }

            if(data[i].url === ''){
                data[i].urlCheck = 'Url is required'
                valid = false
            }
            else if (!(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm.test(data[i].url))){
                data[i].urlCheck = 'Url must be from youtube'
                valid = false
            } else {
                data[i].urlCheck = ''
            }
        }

        setFormVal(data)
        return valid
    }

    const buttOn = () => {
        if (on === true) return false
        else if (on === false) return true
    }




    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(formVal, ({albumInfo: {name: albumName, pic: albumPicture, explicit: albumIsExplicit}}))
        const isSongValid = songValidation(formVal)
        setErrors({})
        let errs = {}
        if(!albumName){
            errs.albumName = "Album Name Required"
        } else if (albumName.length < 2){
            errs.albumName = "Album Name Must Be Two Characters Long"
        }
        if(!albumPicture){
            errs.albumPicture = "Album Must Have A Picture"
        } else if (/\.(jpg|jpeg|png|PNG)$/.test(albumPicture) === false){
            errs.albumPicture = "Image Url Must Be jpg (jpeg) Or png (PNG)"
        }
        if(!isSongValid){
            errs.song = "Song Validations not met"
        }

        if(Object.values(errs).length > 0){
            setErrors(errs)
        }else{
            try{
                setOn(false)
                let albumPrice = formVal.length
                const albumInfo = {
                    albumName,
                    albumPicture,
                    albumPrice,
                    isExplicit: albumIsExplicit
                }
                const newAlbum = await dispatch(makeNewAlbum(albumInfo))
                const albumId = newAlbum.id
                if(albumId){
                    const data = [...formVal]
                    for(let i = 0; i < data.length; i++){
                        if(data[i]){
                            await dispatch(makeNewSong(albumId, {
                                songName: data[i].name,
                                price: 1,
                                songUrl: data[i].url,
                                isExplicit: data[i].isExplicit
                            }))
                        }
                    }
                }

                await (dispatch(getAlbum(albumId)))
                return await (dispatch(getSongsOnAlbum(albumId)))
                .then(history.push(`/albums/${albumId}`))
            }catch(error){
                console.log("errors", errors)
            }
        }




        console.log('is song Valid', isSongValid )

    }



    return (
        <div>
            {user ?
            (isArt ?

                <div className="newAlbumContainer">

            <div className="naFormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="addAlbum">
                        <div id='nat'>
                            <h2>New Album Info</h2>
                        </div>


                        <div id='nai'>
                            <label> Album Name
                                <input
                                    id='an'
                                    type="text"
                                    required
                                    placeholder="Album Name"
                                    value={albumName}
                                    onChange={((e) => setAlbumName(e.target.value))}
                                ></input>
                                {errors.albumName &&  <div className="newAlbumError">{errors.albumName}</div>}
                            </label>

                            <label> Album Picture
                                <input
                                    id='ap'
                                    type="text"
                                    required
                                    placeholder="Album Picutre"
                                    value={albumPicture}
                                    onChange={((e) => setAlbumPicture(e.target.value))}
                                ></input>
                                {errors.albumPicture &&  <div className="newAlbumError">{errors.albumPicture}</div>}
                            </label>

                            <label> Explicit
                                <input
                                    type='checkbox'
                                    value={albumIsExplicit}
                                    onClick={(e) => albumCheck()}
                                ></input>
                            </label>
                        </div>

                    </div>




                    <div className='addSongs'>
                        <div id='addSongText'>Add Songs to Album</div>
                        {errors.song &&  <div className="newSongError">{errors.song}</div>}
                        <div className="addMap">
                    {formVal.map((item, i) => (
                        <div className="naForm">
                            <div className="nasTop">
                                <label>Song Name</label>
                                <input required type="text" name='name' value={item.name || ''} onChange={(e) => onHandle(e, i)}></input>
                                <div className="newSongError">{item.nameCheck}</div>
                            </div>

                            <div className="nasMid">
                                <label>Song Url</label>
                                <input required type="text" name="url" value={item.url || ""} onChange={(e) => onHandle(e, i)}></input>
                                <div className="newSongError">{item.urlCheck}</div>
                            </div>

                            <div className="nasBot">
                                <label>Explicit</label>
                                    <input type="checkbox" name="isExplicit"  onClick={(e) => onCheck(e, i)}></input>
                            </div>
                            <div id='remSB'>
                            {i === 0 ? "" : <button onClick={() => onRemove(i)} id='removeS'>Remove Song Entry</button>}
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                    <div className="NAButt">
                        <button id='addSon' onClick={addRow}>+ Song</button>
                        <button id="subAlbBut" disabled={buttOn()} type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>

            :<h3>Must be an Artist to Add Music</h3>)
            :<h3>Must Be Logged In To Access</h3>}
        </div>
    )
}


export default NewAlbum
