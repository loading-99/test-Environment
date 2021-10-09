<template>
  <div class="container">
    <div class="bg"></div>
    <div class="recordContainer">
      <div class="record">
        <svg
          height="10px"
          width="10px"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="clock"
          class="svg-inline--fa fa-clock fa-w-16"
          role="img"
          viewBox="0 0 512 512"
          style="outline: blue solid 1px"
        >
          <path
            fill="currentColor"
            d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"
          />
        </svg>
        TIME
        <svg
          height="10px"
          width="10px"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="clock"
          class="svg-inline--fa fa-clock fa-w-16"
          role="img"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"
          />
        </svg>
        <div class="startLine"></div>
        <div class="endLine"></div>
      </div>
      <div class="armOrigin">
        <div class="circle"></div>
      </div>
      <div class="armBody">
        <div class="headDot"></div>
        <div class="headSquare"></div>
      </div>
      <div class="controlsContainer">
        <div class="btnContainer">
          <button>
            <svg
              height="10px"
              width="10px"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="fast-backward"
              class="svg-inline--fa fa-fast-backward fa-w-16"
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M0 436V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v151.9L235.5 71.4C256.1 54.3 288 68.6 288 96v131.9L459.5 71.4C480.1 54.3 512 68.6 512 96v320c0 27.4-31.9 41.7-52.5 24.6L288 285.3V416c0 27.4-31.9 41.7-52.5 24.6L64 285.3V436c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12z"
              />
            </svg>
          </button>
          <button>
            <svg
              height="10px"
              width="10px"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="play"
              class="svg-inline--fa fa-play fa-w-14"
              role="img"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
              />
            </svg>
          </button>
          <button>
            <svg
              height="10px"
              width="10px"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="fast-forward"
              class="svg-inline--fa fa-fast-forward fa-w-16"
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M512 76v360c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V284.1L276.5 440.6c-20.6 17.2-52.5 2.8-52.5-24.6V284.1L52.5 440.6C31.9 457.8 0 443.4 0 416V96c0-27.4 31.9-41.7 52.5-24.6L224 226.8V96c0-27.4 31.9-41.7 52.5-24.6L448 226.8V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12z"
              />
            </svg>
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          value="0"
          class="slider"
          id="myRange"
        />
        <div class="records">
          <span class="smaller">Record:</span> <span id="timeHour"></span
          ><!-- / 24-->
        </div>
        <div class="tracks">
          <span class="smaller">Track:</span> <span id="timeMin"></span
          ><!-- / 60-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//eslint-disable
import { $ } from "jquery";

export default {
  mounted() {
    let DONE_ANGLE = 15;
    let START_ANGLE = -9;
    // run a timer to simulate a song playing
    // let secTimePassed = 0;
    // let minTimePassed = 0;

    const moveToRecord = (percentage) => {
      const recAng = recordCompletionAngle(percentage, START_ANGLE, DONE_ANGLE);

      document.querySelector(
        ".armBody"
      ).style.transform = `rotate(${recAng}deg)`;

      $(".record").addClass("rotating");
      // console.log(recAng + 'deg');
    };

    // const stopRecord = (theClass) => {
    //   secTimePassed = 0;
    // };

    //reverse engineer to get the value given the percentage
    // const normalize = (val, min, max) => {
    //   return (val - min) / (max - min);
    // };

    // give back the angle value
    const recordCompletionAngle = (percentage, min, max) => {
      return 1 * ((percentage / 100) * (max - min) + min);
    };

    let slider = document.getElementById("myRange");

    // Update the current slider value (each time you drag the slider handle)
    slider.onchange = function () {
      moveToRecord(this.value);
    };

    // let secTimer = setInterval(() => {
    //   let today = new Date();
    //   let hours = today.getHours();
    //   let minutes = today.getMinutes();
    //   let seconds = today.getSeconds();

    //   let time = hours + ":" + minutes + ":" + seconds;

    //   slider.value = seconds;

    //   moveToRecord((seconds / 60) * 100);

    //   document.querySelector("#timeMin").innerHTML = minutes;
    //   document.querySelector("#timeHour").innerHTML = hours;
    // }, 200);
  },
};
</script>
<style lang="css" scoped>
.container {
  --base: rgb(186, 98, 154);
  --base: rgb(167, 95, 68);
  --base: rgb(184, 64, 102);

  --r: 184;
  --g: 64;
  --b: 102;

  --col00: rgb(calc(var(--r) - 100), 0, 0);
  --col0: rgb(calc(var(--r) - 50), calc(var(--g) - 50), calc(var(--b) - 50));
  --col1: rgb(calc(var(--r) - 40), calc(var(--g) - 40), calc(var(--b) - 40));
  --col2: rgb(calc(var(--r) - 30), calc(var(--g) - 30), calc(var(--b) - 30));
  --col3: rgb(calc(var(--r) - 20), calc(var(--g) - 20), calc(var(--b) - 20));
  --col4: rgb(calc(var(--r) - 10), calc(var(--g) - 10), calc(var(--b) - 10));
  --col5: rgb(var(--r), var(--g), var(--b));
  --col6: rgb(calc(var(--r) + 10), calc(var(--g) + 10), calc(var(--b) + 10));
  --col7: rgb(calc(var(--r) + 20), calc(var(--g) + 20), calc(var(--b) + 20));
  --col8: rgb(calc(var(--r) + 30), calc(var(--g) + 30), calc(var(--b) + 30));
  --col9: rgb(calc(var(--r) + 40), calc(var(--g) + 40), calc(var(--b) + 40));
  --col10: rgb(calc(var(--r) + 50), calc(var(--g) + 50), calc(var(--b) + 50));
  --col11: rgb(calc(var(--r) + 60), calc(var(--g) + 60), calc(var(--b) + 60));
  --col12: rgb(calc(var(--r) + 70), calc(var(--g) + 70), calc(var(--b) + 70));
  --col13: rgb(calc(var(--r) + 80), calc(var(--g) + 80), calc(var(--b) + 80));
}

/*
rgb(191,200,243) 
rgb(0,9,76)
rgb(64,73,140)
rgb(128,137,204) */

.container {
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  /* background-color: green; */
}

.bg {
  position: fixed;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background: radial-gradient(var(--col11), var(--col1));
  background-repeat: no-repeat;
}

.recordContainer {
  z-index: 2;
  height: 200px;
  width: 200px;
  position: absolute;
  background-color: var(--col6);
  border: 1px solid var(--col3);
  top: 40%;
  left: 48%;
  transform: translate(-50%, -50%);
  /* 	opacity:0; */
}

.armOrigin {
  height: 12.5%;
  width: 12.5%;
  border-radius: 3px;
  position: absolute;
  background-color: var(--col2);
  top: 9%;
  left: 67%;
}

.armOrigin > .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80%;
  border-radius: 50%;
  background-color: var(--col3);
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 4px solid var(--col4);
}

.armBody {
  position: absolute;
  top: 15%;
  left: 71%;
  background: var(--col12);
  width: 5%;
  height: 35%;
  transition: transform 500ms;
  transform-origin: top center;
  transform: rotate(-20deg);
  border-radius: 0px 0px 999px 999px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
}

.armBody:before {
  content: "";
  position: absolute;
  top: -6%;
  left: 0%;
  background-color: var(--col12);
  width: 100%;
  height: 50%;
  border-radius: 999px;
}

.armBody:after {
  content: "";
  position: absolute;
  top: 85%;
  left: 50%;
  background-color: var(--col12);
  width: 100%;
  height: 40%;
  transform-origin: top left;
  transform: rotate(-320deg);
  border-radius: 999px;
}

.headDot {
  position: absolute;
  top: 112%;
  left: -84%;
  background-color: var(--col3);
  width: 50%;
  height: 7%;
  z-index: 3;
  border-radius: 50%;
}

.headSquare {
  position: absolute;
  top: 104%;
  left: -124%;
  background-color: var(--col2);
  width: 130%;
  height: 20%;
  /* 	z-index:3; */
  border-radius: 2px;
  transform: rotate(-45deg);
}

.headSquare:after {
  content: "";
  position: absolute;
  top: -12%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--col11);
  width: 80%;
  height: 25%;
  border-radius: 2px;
  z-index: -1;
}

.controlsContainer {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 100%;
  background-color: inherit;
  border-left: 1px solid var(--col4);
  border-right: 1px solid var(--col4);
}

.btnContainer,
.btnContainer2 {
  height: 100%;
  width: 100%;
  position: absolute;
  text-align: center;
}

.btnContainer {
  top: 30%;
}

.btnContainer2 {
  top: 60%;
}

.btnContainer > button,
.btnContainer2 > button {
  position: relative;
  width: 15%;
  height: 15%;
  border-radius: 100%;
  border: 1.5px solid var(--col9);
  background-color: inherit;
  cursor: pointer;
  color: var(--col9);
}

.btnContainer > button:hover,
.btnContainer2 > button:hover {
  opacity: 0.5;
}

.slider {
  position: absolute;
  width: 60%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.record {
  text-align: center;
  color: var(--col13);
  line-height: 500%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 60%;
  width: 60%;
  transition: transform 500ms;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  background-color: var(--col00);
  /* 	background: url("https://assets.codepen.io/2045658/daft.png") no-repeat center; */
  background-size: 122px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  font-size: 0.8em;
}

/* dot in middle */
.record:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  height: 10%;
  width: 10%;
  transform: translate(-50%, -50%);
  background-color: var(--col5);
  border-radius: 100%;
  border: 4px solid var(--col13);
}

/* line on the outside of the record */
.startLine {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 80%;
  width: 80%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0);
  border-radius: 100%;
  border: 1px solid var(--col6);
}

/* line on the inside of the record */
.endLine {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 30%;
  width: 30%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0);
  border-radius: 100%;
  border: 1px solid var(--col6);
}

.rotating {
  animation: rotate 6s linear infinite;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.records,
.tracks {
  font-family: "Roboto", sans-serif;
  text-align: center;
  padding-top: 5px;
}

/*Chrome*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    width: 80px;
    -webkit-appearance: none;
    background-color: var(--col9);
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: var(--col3);
    margin-top: -1px;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 10px;
    cursor: ew-resize;
    background: var(--col13);
    box-shadow: -80px 0 0 80px var(--col2);
  }
}
/** FF*/
input[type="range"]::-moz-range-progress {
  background-color: var(--col13);
}
input[type="range"]::-moz-range-track {
  background-color: var(--col6);
}
/* IE*/
input[type="range"]::-ms-fill-lower {
  background-color: var(--col13);
}
input[type="range"]::-ms-fill-upper {
  background-color: var(--col6);
}
.smaller {
  font-size: 0.7em;
  color: var(--col1);
}
#timeMin,
#timeHour {
  font-size: 1em;
  color: var(--col00);
}
</style>