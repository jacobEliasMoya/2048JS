// decl obj main game
let mainGame = {
    //adding in various elmnts to obj
    currScoreText: document.querySelector('.score-text'),

    bestScoreText: document.querySelector('.best-score-text'),

    //adding in (2) buttons for now

    menuButton: document.querySelector('.game-menu'),

    ldrButton: document.querySelector('.game-leaderboard'),

    //adding in game board and (16)pcs separately
    
    gameBrd: document.querySelector('.game-board'),

    gamePcs: document.querySelectorAll('.game-board .piece'),

    openSpot : [],
    usedSpot : [],

    moveStop : 0,
    

    buttons:{
        up: document.querySelector('.up-button'),
        down:document.querySelector('.down-button'),
        left:document.querySelector('.left-button'),
        right:document.querySelector('.right-button')
    },

    // function to assign game pcs into corresponding arrs
    asnUsedUnused(){
        // creating array to push data into for foreach loop
        let pceAr = [];
        // looping through pcs to perform next step in function
        this.gamePcs.forEach(pce=>{

            if(pceAr.length<16){
                //pushing piece into array outside of loop
                pceAr.push(pce);
            } else {
                // clearing arr for new data
                return;
            }
            // storing index to be used in if/else below
            if(pce.innerHTML===''){              
                // if empty space push the index to open spor atrr
                this.openSpot.push(pce);
                
            } else {
                // else push the index to used spor atrr
                this.usedSpot.unshift(pce);

            }
        })
    },

    colorTile(){
        let lowestVal = 2;
        let colorAr = 
        ['silver',
        'rgb(216, 200, 179)',
        'rgb(211, 166, 118)',
        'rgb(202, 127, 29)',
        'rgb(197, 88, 84)',
        'rgb(196, 70, 66)',
        'rgb(196, 38, 33)',
        'rgb(194, 194, 143)',
        'rgb(196, 196, 99)',
        'rgb(211, 211, 58)',
        'rgb(251, 255, 0)'];
        this.gamePcs.forEach(spot=>{
            let spotVal = parseInt( spot.innerHTML);
            switch(spotVal){
                case Math.pow(lowestVal,1):
                    spot.style.background = colorAr[0]; 
                    break;
                case Math.pow(lowestVal,2):
                    spot.style.background = colorAr[1]; 
                    break;
                case Math.pow(lowestVal,3):
                    spot.style.background = colorAr[2]; 
                    break;
                case Math.pow(lowestVal,4):
                    spot.style.background = colorAr[3]; 
                    break;
                case Math.pow(lowestVal,5):
                    spot.style.background = colorAr[4]; 
                    break; 
                case Math.pow(lowestVal,6):
                    spot.style.background = colorAr[5]; 
                    break; 
                case Math.pow(lowestVal,7):
                    spot.style.background = colorAr[6]; 
                    break; 
                case Math.pow(lowestVal,8):
                    spot.style.background = colorAr[7]; 
                    break; 
                case Math.pow(lowestVal,9):
                    spot.style.background = colorAr[8]; 
                    break; 
                case Math.pow(lowestVal,10):
                    spot.style.background = colorAr[9]; 
                    break; 
                case Math.pow(lowestVal,11):
                    break; 
                default:
                    spot.style.background = colorAr[0]; 

            
            }

        })
    },

    // this will add at random 2 tiles, wont utilize same tile twice.
    addTwoTiles(){
        let counter = 0;
        //starting 2 possible values in game 
        let nums = [2,4];

        while (counter<2){
            //increm counter for loop to function
            counter++;
            // setting 2 random number to be tied to var
            let n1 =  nums[Math.floor(Math.random()*nums.length)];
            if(n1===undefined){
                console.log('yes');
            } else{
                console.log('no');
            }
            //setting random open spots inner html to n1 val ^^
            this.openSpot[Math.floor(Math.random()*this.openSpot.length)].innerHTML=n1;
            //clearing open/used spot array so function assign new val
            this.openSpot=[];
            this.usedSpot=[];
            //running below to reassing values to above arrs
            this.asnUsedUnused();
            this.colorTile();
        }
    },

    // tiles are going to be added together used 2 pce as prmtrs 
    tileAdd(tileOne, tileTwo){
        let v1 = parseInt(tileOne.innerHTML);
        let v2 = parseInt(tileTwo.innerHTML);
        if(isNaN(v2)){
            tileTwo.innerHTML=tileOne.innerHTML;
            tileOne.innerHTML='';

        } else {
            if(tileOne.innerHTML===tileTwo.innerHTML){
                tileTwo.innerHTML = v1 + v2;
                tileOne.innerHTML =''; 
            } 
        }
    },

    
    move(direction){

        //declaring main array to contain all of the tiles
        let mainAr=[];
        //empty array to hold piece 1 data
        let piece1Ar=[];
        //empty array to hold piece 2 data
        let piece2Ar=[];
        //empty array to hold piece 2 index data
        let piece2IndAr=[];
        //empty array to hold piece 1 index data
        //looping through all game pieces
        // **begin loop
        this.gamePcs.forEach(piece=>{
            // pushing all pieces into mainarr 
            mainAr.push(piece);
            //checking to see if a tile is filled or not
            if(piece.innerHTML!=''){
                //if tile isnt equal to an empty spot 
                //push the piece to p1arr  
                piece1Ar.push(piece);
            }
        })
        // **end loop
        if(direction==='UP'){
            // looping through all pieces
            // in pc1 array


            piece1Ar.forEach(piece=>{
                // declaring var to hold index of 
                // each piece index
                let pcInd = mainAr.indexOf(piece);
                // declaring var to hold index of 
                // each piece2 index
                let  pc2Ind = pcInd - 4;
                //pushing piece two index into 
                // respective array
                piece2IndAr.push(pc2Ind);
            })
            // ** end loop 
            //looping through all indexes in array 
            piece2IndAr.forEach(p2Ind=>{
                //pushing each index into based off main array
                // into piece1Ar
                piece2Ar.push(mainAr[p2Ind]);
            })
            // ** end loop

            let count = 0;
            

            while(count<piece2Ar.length){
                while(this.moveStop<1){
                    if (piece2Ar[count]!= undefined){

                        this.tileAdd(piece1Ar[count],piece2Ar[count]);
                    }
                    count++;
                }
            }
            // this.addTwoTiles();
        }
    }
}

mainGame.buttons.up.addEventListener('click',()=>{
    mainGame.move(mainGame.buttons.up.innerHTML);
})

mainGame.buttons.down.addEventListener('click',()=>{
    mainGame.move(mainGame.buttons.down.innerHTML);

})

mainGame.buttons.left.addEventListener('click',()=>{
    mainGame.move(mainGame.buttons.left.innerHTML);
})

mainGame.buttons.right.addEventListener('click',()=>{
    mainGame.move(mainGame.buttons.right.innerHTML);

})

mainGame.asnUsedUnused();
mainGame.addTwoTiles();