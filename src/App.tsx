import { useEffect, useState, useRef } from 'react';
import './App.css';
import { getAllPeople, getPeopleById, getSearchByText } from "./api/people";
import { charactersResponse, errorState, character } from "./types/types";

const initStateCharact = {
  count: 0,
  next: null,
  previous: null,
  results: []
}
function App() {

  const [page, setPage] = useState<number>(1)
  const [characters, setCharacters] = useState<charactersResponse>(initStateCharact)
  const [loading, setLoading] = useState<boolean>(true)
  const [errorState, setErrorState] = useState<errorState>({hasError: false, message:""})
  const [currentIdCharac, setCurrentIdCharac] = useState<number>(0)
  const [details, setDetails] = useState<character | null>()
  const [textSearch, setTextSearch] = useState<string>("")

  const inputSearch:any = useRef(null)

  useEffect(() => {
    getAllPeople(page)
      .then(characters => {
        setCharacters(characters)
        setLoading(false)
      })
      .catch(handleError)
  }, [page])

  useEffect(() => {
    if(currentIdCharac)
      getPeopleById(currentIdCharac)
      .then(setDetails)
      .catch(handleError)
  }, [currentIdCharac])
  
  
  const handleError = (err:any)=>{
    setErrorState({hasError: true, message: err.message})
  }

  if (loading) {
    return (
    <div className="App">
      <header className="App-header">
        <span style={{color:"white"}}>Loading.....</span>
      </header>
    </div>
    )
  }

  setTimeout(() => {
    console.log(characters);
  }, 2000);

 const showDetails = (character: character) =>{
    const idCharacter: number = Number(character.url.split('/').slice(-2)[0])
    setCurrentIdCharac(idCharacter)
 }

 const onChangeTextSearch = () => {
  const text = inputSearch.current.value;
  setTextSearch(text)
 }

 const onSearchSubmit = (event:any) => {
  if (event.key !== 'Enter') return

  setLoading(false)
  
  inputSearch.current.value = "";
  setDetails(null)

  getSearchByText(textSearch)
    .then( (characters) => {
      setCharacters(characters)
      setLoading(false)
    })
    .catch(handleError)
 }

 const onChangePage = (increment:number) =>{
  const pages:number = Math.ceil(characters.count / 10);

  if (!characters.previous && page + increment <= 0) return
  if (!characters.next && page + increment >= pages) return

  setPage(page + increment)
 }

  return ( 
    <div className="App">
      <header className="App-header">
        <input 
          ref={inputSearch} 
          onChange={onChangeTextSearch} 
          onKeyDown={onSearchSubmit}
          type="text" 
          placeholder='Character search' 
        />

        {errorState.hasError && ( <div style={{color:"red"}}>{errorState.message}</div> )}
        {characters?.results.map( character => <li onClick={() => showDetails(character)} key={character.name}>{character.name}</li> )}

        <section>
          <button onClick={() => onChangePage(-1)} >Prev</button>
          ||{page}||
          <button onClick={() => onChangePage(1)} >Next</button>
        </section>

        {details && (<aside>
          <h2>Character detail</h2>
          <ul>
            <li>Name: {details?.name}</li>
            <li>Height: {details?.height}</li>
            <li>Birth Year: {details?.birth_year}</li>
          </ul>
        </aside>)}
      </header>
    </div>
  );
}

export default App;
