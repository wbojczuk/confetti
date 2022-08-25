"use strict";

const confettiAnim = {
    confettiHeight: [-150, -350],
    confettiHeightUnit: "px",
    confettiSpreadAmt: [0, 100],
    confettiSpreadUnit: "px",
    confettiColors: ["#C70C54", "#5ED72D", "#F3F75C", "#68DBF1", "#F168ED"],
    confettiSize: [4, 10],
    confettiSizeUnit: "px",
    confettiAmt: 45,
    confettiSpin: [150, 280],
    confettiSpeed: [3000, 4000],

    // Setup
    setup: ()=>{
        if(document.querySelector(".as-confetti")){
            const elems = document.querySelectorAll(".as-confetti");
            const elemsLength = elems.length;
            for(let i = 0; i < elemsLength; i++){
               confettiAnim.confettiAnim(elems[i]); 
            }
        }

        if(document.querySelector(".as-confetti-hover")){
            const elems = document.querySelectorAll(".as-confetti-hover");
            const elemsLength = elems.length;
            for(let i = 0; i < elemsLength; i++){
               elems[i].addEventListener("mouseenter", confettiAnim.confettiHandler); 
            }
        }

    },

    confettiAnim: (elem)=>{
        elem.style.position = "relative";
        const confettiWrapper = document.createElement("div");
        confettiWrapper.className = "as-confetti-wrapper";

        const confettiCenter = document.createElement("div");
        confettiCenter.className = "as-confetti-center";

        confettiWrapper.append(confettiCenter);
        elem.append(confettiWrapper);


        // STYLESHEET INJECTION

        const confettiStyles = document.createElement("style");
        confettiStyles.id = `confettiStyles${confettiAnim.confettiInstances}`;
        
        //INJECT ANIMATIONS 
        for(let i = 0; i < confettiAnim.confettiAmt; i++){

            const pieceSize = (Math.random() * (confettiAnim.confettiSize[1] - confettiAnim.confettiSize[0]) + confettiAnim.confettiSize[0]); 


            let spread = Math.random() * (confettiAnim.confettiSpreadAmt[1] - confettiAnim.confettiSpreadAmt[0]) + confettiAnim.confettiSpreadAmt[0];
            if(Math.round(Math.random() * (1-2)+1)==1){spread = -1 * (spread);}

            const height = Math.random() * (confettiAnim.confettiHeight[1] - confettiAnim.confettiHeight[0]) + confettiAnim.confettiHeight[0];
            
            const currentPerc  = Math.round(Math.random() * (100 - 45) + 45);

            let spin = Math.random() * (confettiAnim.confettiSpin[1] - confettiAnim.confettiSpin[0]) + confettiAnim.confettiSpin[0];
            if(Math.round(Math.random() * (2-1)+1)==1){spin = spin*-1}
            

            confettiStyles.textContent += `
            @keyframes confetti${confettiAnim.confettiInstances}${i}{
                0%{
                    transform: translateY(0) translateX(0) rotate(0);
                    width:0;
                    height:0;
                   
                }
                20%{
                    transform: translateY(${height}${confettiAnim.confettiHeightUnit}) translateX(${spread}${confettiAnim.confettiSpreadUnit}) rotate(${spin}deg);
                    width: ${pieceSize}${confettiAnim.confettiSizeUnit};
                    height: ${pieceSize}${confettiAnim.confettiSizeUnit};
                    
                }


                ${currentPerc}%{
                    width:0;
                    height:0;
                
                }

                100%{transform: translateY(0) translateX(${spread}${confettiAnim.confettiSpreadUnit}) rotate(0);}
            }
            `;
        }

        document.getElementsByTagName("head")[0].append(confettiStyles);

        // ACTUAL CONFETTI SETUP/INJECTION

        const confettiPiece = document.createElement("div");
        confettiPiece.className = "as-confetti-piece";
        
        const colorAmt = confettiAnim.confettiColors.length;

        for(let i = 0; i < confettiAnim.confettiAmt; i++){
            
            
            const curColor = Math.floor(Math.random() * colorAmt);

            const curSpeed = (Math.random() * (confettiAnim.confettiSpeed[1] - confettiAnim.confettiSpeed[0]) + confettiAnim.confettiSpeed[0]); 

            const tempPiece = confettiPiece.cloneNode(false);
            tempPiece.setAttribute("style", `
                background-color: ${confettiAnim.confettiColors[curColor]};
                animation: confetti${confettiAnim.confettiInstances}${i} ${curSpeed}ms forwards;
            `);
            const currentShape = Math.round(Math.random() * (3-1)+1);
            if(currentShape == 2){
                tempPiece.style.border = "0px solid transparent";
                tempPiece.style.borderRadius = "50%"; 
            }

            if(currentShape == 1){
                tempPiece.style.clipPath = "polygon(0% 100%, 50% 0%, 100% 100%)";
            }

            confettiCenter.append(tempPiece);

        }

        confettiAnim.confettiInstances++;
        
            elem.setAttribute("data-confettioff", "true");
            setTimeout(()=>{
                confettiWrapper.remove();
            },confettiAnim.confettiSpeed[1]);
            setTimeout(()=>{
                elem.removeAttribute("data-confettioff");
            },confettiAnim.confettiSpeed[1]/2);
    },

    confettiInstances: 0,

    confettiHandler: (evt)=>{
        if(!evt.target.hasAttribute("data-confettioff")){
            confettiAnim.confettiAnim(evt.target);
        }
    },

};

confettiAnim.setup();