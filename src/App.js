import React, { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'
import './App.css'

function App() {
	const [item, setItem] = useState('')
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || [])

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items))
	}, [items])

	const newItem = () => {
		if (item.trim() !== '') {
			const newItem = {
				id: v4(),
				item,
				color: randomColor({
					luminosity: 'light',
				}),
				defaultPos: {
					x: 500,
					y: -500,
				},
			}
			setItems((items) => [...items, newItem])
			setItem('')
		} else {
			alert('Enter somthing')
			setItem('')
		}

	}

	const deleteNode = (id) => {
		setItems(items.filter((item) => item.id !== id))
	}

	const updatePos = (data, index) => {
		let newArr = [...items]
		newArr[index].defaultPos = {
			x: data.x,
			y: data.y,
		}
		setItems(newArr)
	}

	const keyPress = (e) => {
		const code = e.keyCode || e.which
		if (code === 13) {
			newItem()
		}
	}

	return (
		<div className='App'>
			<div className='wrapper'>
				<input
					value={item}
					placeholder='Enter something...'
					type='text'
					onChange={(event) => setItem(event.target.value)}
					onKeyPress={(e) => keyPress(e)}
				/>
				<button className='enter' onClick={newItem}>
					Enter
				</button>
			</div>

			{
				items.map((item, index) => {
					return (
						<Draggable
							onStop={(_, data) => {
								updatePos(data, index)
							}}
							key={`${item}__${index}`}
							defaultPosition={item.defaultPos}
						>
							<div className='todo__item' style={{ backgroundColor: item.color }}>
								{`${item.item}`}
								<button
									className='delete'
									onClick={() => deleteNode(item.id)}
								>X</button>
							</div>

						</Draggable>
					)
				})
			}
		</div>
	)
}

export default App
