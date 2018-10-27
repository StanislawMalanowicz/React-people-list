
import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../style/style.css';
// const dataTwo = require ('../data/db2.json');
// const data = require ('../data/db.json').users;
import 'whatwg-fetch';


// console.log(data[1].name)
// console.log(dataTwo)
class PostList extends Component{
    constructor(props){
        super(props);
        this.state = {
            // data: [],
            pending: true,
            peopleToDelete: []
        };
        this.delWoman = this.delWoman.bind(this)
    }
    componentDidMount(){
        
        this.fetchData();
        
    }
 

    fetchData = () => {
        fetch('http://localhost:3000/users').
        then( resp => resp.json()).
        then ( ip => {
            console.log('Users: ', ip);
            
            this.setState({
                data : ip,
                pending: false
            });
            
        }) 
    };
   
    maleOrFemale = (pesel) => {

        let nrToStr = pesel + "";
        if(nrToStr[nrToStr.length -2] % 2 === 0){
            let sex = "woman";
            return "Kobieta";
        }else{
            let sex = "man";
            return "Mężczyzna";
        }
    };

    peselToBirth = (pesel) =>{
        let nrToStr = pesel + "";
        let day = nrToStr.slice(4,6);
        let month = nrToStr.slice(2,4);
        let year = nrToStr.slice(0,2);
        let nrToDate =  day+"."+month+ "."+year;
        return nrToDate;
    
    };
    
    removeItem(item) {
        const newPeople = this.state.data.filter( people =>{
            return people.id !== item
        })
            // console.log('remove', item)
        this.setState({
          data: newPeople
        });
        console.log("remove ",item, this.state.data)
      }
      
     delWoman(){
         
        console.log("dupa delpepl", this.state.peopleToDelete)
        console.log("dupa data", this.state.data)
         const newWoman = this.state.data.filter( people =>{
           return !this.state.peopleToDelete.includes(people.id)
            }
        )
         
         this.setState({
             data: newWoman
         })
        console.log( "newwoman: ", newWoman)
     } 
    checkingFunction(e){
        const target = e.target;
        target.checked ? this.checkedPeople : console.log('dupa:(')
    }
   
    checkedPeople  (event) {
         this.setState({
            peopleToDelete: [...this.state.peopleToDelete, event]
         })
        
    }  
    render(){
        console.log("delete people ", this.state.peopleToDelete)
        
        if(this.state.pending){
            return(
                <p>Loading...</p>
            )
        }
        const users = this.state.data
        // let sex = "";
        console.log("czesc",users.id)
        
        {console.log("hi: ", this.state.data[0].id)}
        return(
            <div>
              
                    <table className="woman">
                        <tbody>
                        <tr>
                            <th>Kobiety:</th>   
                        </tr> 
                        <tr>
                            <th><button onClick={this.delWoman}>usuń zaznaczone</button></th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Data urodzenia<span> (dzien.miesiac.rok)</span></th>
                            {/* <th>Płeć</th> */}
                        </tr>

                        {users.map((people, i) => {
                            
                            if(this.maleOrFemale(people.pesel) ==="Kobieta"){
                                var sex = "woman";
                                return (
                                    <tr key={people.id} gender={sex}>
                                    {/* <button onClick={(e) => this.removeItem(people.id)}> Usuń mnie </button> */}
                                        <td><input type="checkbox" onChange={(e) => this.checkedPeople(people.id)}/></td>
                                        <td>{people.name}</td>
                                        <td>{people.surname}</td>
                                        <td>{this.peselToBirth(people.pesel)}</td>
                                        {/* <td>{this.maleOrFemale(people.pesel)}</td>                    */}

                                    </tr>)
                            }
                        
                            // console.log(typeof people.pesel)
                        })}
                        </tbody>
                    </table>
                    <table className="man">
                        <tbody>
                        <tr>
                            <th>Mężczyźni:</th>   
                        </tr> 
                        <tr>
                            <th><button onClick={this.delMan}>usuń zaznaczone</button></th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Data urodzenia<span> (dzien.miesiac.rok)</span></th>
                            {/* <th>Płeć</th> */}
                        </tr>

                        {users.map((people, i) => {
                            
                            if(this.maleOrFemale(people.pesel) ==="Mężczyzna"){
                                var sex = "man";
                                return (
                                    <tr key={people.id} gender={sex}>
                                        <td><input type="checkbox" onClick={this.checkingFunction}/></td>
                                        <td>{people.name}</td>
                                        <td>{people.surname}</td>
                                        <td>{this.peselToBirth(people.pesel)}</td>
                                        {/* <td>{this.maleOrFemale(people.pesel)}</td>                    */}
                                    </tr>)
                            }
                        
                            // console.log(typeof people.pesel)
                        })}
                        </tbody>
                    </table>
               
            </div>
        )
      


    }
}



ReactDOM.render(
    <PostList/>,
    document.getElementById("app")
);

