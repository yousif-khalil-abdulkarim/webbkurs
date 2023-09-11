"use strict";

import { useEffect, useRef, useState } from "react"

function useTodos() {
  const serializedInitialState = window.localStorage.getItem("state")
  let initialState = []
  if (serializedInitialState) {
    initialState = JSON.parse(serializedInitialState)
    console.log(initialState)
  }
  const [state, setState] = useState(initialState)
  const serializedState = JSON.stringify(state)
  useEffect(() => {
    window.localStorage.setItem("state", serializedState)
  }, [serializedState])
  const refId = useRef(0)
  function create(value = "") {
    setState(
        previousState => [
            ...previousState, {
            id: refId.current,
            value
          }
        ]
    );
    refId.current++
  }
  function remove(id) {
    setState(
      previousState => previousState.filter(
        (item) => item.id !== id
      )
    )
  }
  function update(id, value) {
    setState(
      previousState => previousState.map(item => {
        if (item.id === id) {
          return {
            id,
            value
          }
        }
        return item
      })
    )
  }
  return [
    state, 
    {
      create,
      remove,
      update
    }
  ]
}

function TodoItem({ value, onRemove, onChange }) {
  const [isInEditMode, setIsInEditMode] = useState(false)
  const onEditHandler = () => {
    setIsInEditMode(
      previousIsInEditMode => !previousIsInEditMode
    )
  }
  useEffect(() => {
    if (isInEditMode) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
    else {
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }, [isInEditMode])
  const inputRef = useRef()
  return (
    <div className="hstack gap-3">
      <input
        ref={inputRef}
        value={value}
        placeholder="Todo content"
        disabled={!isInEditMode} 
        className="form-control"
        onChange={event => onChange(event.target.value)}
      />
      <button 
        className={`btn ${isInEditMode ? "btn-success" : "btn-primary"}`}
        onClick={onEditHandler}
      >
        {isInEditMode ? "save" : "edit"}
      </button>
      <button
        className="btn btn-danger"
        onClick={onRemove}
      >
        remove
      </button>
    </div>
  )
}

function TodoCreator({ onAdd }) {
  const [text, setText] = useState("")
  const onChangeHandler = event => setText(event.target.value)
  const onAddButtonClick = () => {
    setText("")
    onAdd(text)
  }
  
  return (
    <nav 
      className="navbar navbar-expand-lg bg-body-tertiary"
    >
      <div 
        className="container-fluid hstack gap-3"
      >
        <a className="navbar-brand" href="#">Todos app</a>
        <input
          value={text}
          onChange={onChangeHandler}
          className="form-control"
          placeholder="Todo content"
        />
        <button
          onClick={onAddButtonClick}
          className="btn btn-outline-success"
        >
          Create
        </button>
      </div>
    </nav>
  )
}

export function App() {
  const [
    todos,
    {
      create,
      remove,
      update
    }
  ] = useTodos()
  return (
    <div className="container vstack gap-4">
      <TodoCreator onAdd={text => create(text)}/>
      <div className="vstack gap-2">
          {todos.map(({ id, value }) => {
            return (
              <TodoItem
                key={id}
                value={value}
                onRemove={() => remove(id)}
                onChange={(text) => update(id, text)}
              />
            )
          })}
        </div>
    </div>
  )
}