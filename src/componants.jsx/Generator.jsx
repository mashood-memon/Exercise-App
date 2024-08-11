import React from "react";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";
import { SCHEMES, WORKOUTS } from "../utils/exercises";
import { useState } from "react";

function Header({ index, title, description }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl ">{title}</h4>
      </div>
      <p className="text-lg sm:text-base mx-auto">{description}</p>
    </div>
  );
}

function Generator({muscles, setMuscles, goals, setGoals,poison, setPoison, updateWorkout}) {
  const [showModal, setShowModal] = useState(false);
  

  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup){
    if(muscles.includes(muscleGroup)){
        setMuscles(muscles.filter(val=> val!== muscleGroup))
        return
    }

    if(muscles.length>2){
        return
    }
    if(poison !== 'individual'){
        setMuscles([muscleGroup])
        //setShowModal(false)
    }
    
    setMuscles([...muscles, muscleGroup])

    if(muscles.length===2){
        setShowModal(false)
    }
    

  }

  return (
    <SectionWrapper
    id={'generate'}
      header={"Generate Your Workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              key={typeIndex}
              className={`border border-blue-400 bg-slate-950 py-3 rounded-lg duration-200 hover:border-blue-600 ${
                type === poison ? "border-blue-600" : "border-blue-400"
              }`}
              onClick={() =>{
                setPoison(type)
                setMuscles([])} }
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock On Targets"}
        description={"Select the muscles judged for annihilation"}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button
          className="relative flex items-center justify-center p-3"
          onClick={toggleModal}
        >
          <p className="capitalize">{muscles.length===0? 'Select Muscle Groups': muscles.join(' ')}</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down "></i>
        </button>
        {showModal &&(
            <div className="flex flex-col p-3 px-3 pb-3">
                {(poison==='individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex)=>{
                    return(
                        <button
                         key={muscleGroupIndex} 
                         className={`hover:text-blue-300 t duration-200 ${muscles.includes(muscleGroup)?'text-blue-400':''}`}
                         onClick={()=> updateMuscles(muscleGroup)}
                         >
                            <p className="uppercase">{muscleGroup.replaceAll('_',' ')}</p>
                        </button>
                    )

                })}

            </div>
        )
        
         
         }
      </div>

      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              key={schemeIndex}
              className={`border border-blue-400 bg-slate-950 py-3 rounded-lg duration-200 hover:border-blue-600 ${
                scheme === goals ? "border-blue-600" : "border-blue-400"
              }`}
              onClick={() => setGoals(scheme)}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Button func={updateWorkout} text={'Formulate'}/>
    </SectionWrapper>
  );
}

export default Generator;
