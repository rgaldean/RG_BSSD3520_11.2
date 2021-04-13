/***************************************************************\
* Attribution:                                                  *
*  main.js and index.html are taken from code                   *
*  provided by Armadno Armador at:                              *
*  https://github.com/ArmandoAmador/Fetch-API-Promises-Tutorial *
*                                                               *
* ChangeLog:                                                    *
*  1. Added event listener DOMContentLoaded around all code.    *
*  2. renamed index.js to main.js                               *
\***************************************************************/

/*
    11.1 Reading Resources:
    
    1. This describes promises and asynchronous programming.
        It links to an earlier discussion of promises as well.
        https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
        
    2. This walks you through the base code below and explains each section.
        https://medium.com/@armando_amador/how-to-make-http-requests-using-fetch-api-and-promises-b0ca7370a444
    
    3. This covers the map method in JS with some simple examples.
        https://www.w3schools.com/jsref/jsref_map.asp
*/

/* 
    X Task 1: inspect the response json via the console.
    X Task 2: make the names clickable
    X Task 3: when a name is clicked, visit the first films url that person is in
    
    ******* Submit via github Wednesday before 10PM ********
    X HW Task 1: Put the name of the character in the list element
    X HW Task 2: add a color attribute or tag to change the name to the eye_color of the creature.
    *********************************************************
    
    X Task pre-4: Make a creature name clickable to fetch film.

    X Task 4: instead of visiting the url, perform a fetch on it to get the movie name
    X Task 5: display the movie name in a new, answer div
    X Task 6: If the movie of a character was already visitied, do not revisit, show the  name.
    X Task 7: Change the name of each character to have a font color that matches their eye_color
    
    
    
/***************************************************************\    
    Homework Due Monday before 10PM via github:
    
    XHW 11.2 Task 1: in addition to retrieveing the title value for a film, retrieve the date value as well and print it in the answer like this: Title (date)  
    xHW 11.2 Task 2: change all list items to also be buttons
\***************************************************************/

const URL = "https://ghibliapi.herokuapp.com/people";


const filmObj = {
    lookUp: function(url) {
        if(this[url] === undefined) {
            fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((filmData) => {
                console.log("fetching")
                this[url] = filmData.title + '(${filmData.release_data})';
                document.getElementById("answer").innerHTML = this[url];
            })
        } else {
            console.log(filmObj)
            
            document.getElementById("answer").innerHTML = this[url];
        }
    }
}

function displayableObject({name, film, eyeColor}) {
    return {
       display: () => {
           const listElement = document.createElement('button');
           listElement.innerHTML = name;
           listElement.style = `color:${eyeColor}`;
           listElement.addEventListener('click', (event)=>{
               filmObj.lookUp(film);
           });
           return listElement;
        } 
    }
}

function baseCreatureCreator({name, films, eye_color}){
    const state = {
        name: name,
        film: films[0],
        eyeColor: eye_color
    }
    return {
        ...state,
        ...displayableObject(state)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //go get the data for the page content
    fetch(URL)
    .then((response) => {
        //console.log(response);
        return response.json();
    })
    .then((people) => {
        //console.log(people);
        getListOfNames(people);
    })
    
    document.getElementById("main").innerHTML = '';
    
    const main = document.getElementById("main");
          main.innerHTML = "<p>Characters....";

    const nameToObject = (person) => {
        const creat = baseCreatureCreator(person);
        return creat;
    };
    
    
    const getListOfNames = (people) => {
        let creatures = []
        for(let i=0; i<people.length; i++) {
            const cObj = nameToObject(people[i]);
            creatures.push(cObj);
        }
        
        //const creatures = people
        //.map((person) => nameToObject(person));
        
        const ul = document.createElement('ul');
        for(creat of creatures) {
            ul.appendChild(creat.display());
        const br = document.createElement('br');
            ul.appendChild(br);
        }
        
        main.appendChild(ul);
    }
});
