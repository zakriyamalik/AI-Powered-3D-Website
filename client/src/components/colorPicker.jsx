import React from 'react'
import {SketchPicker} from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'
const ColorPicker = () => {
  const snap = useSnapshot(state);
  
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
      color={snap.color}
      disableAlpha
      const presetColors = {[
        '#FF7F50', // Coral
        '#40E0D0', // Turquoise
        '#FA8072', // Salmon
        '#F0E68C', // Khaki
        '#DDA0DD', // Plum
        '#ADD8E6'  // Light Blue
      ]}
      
      onChange={(color)=> state.color=color.hex}
      />
    </div>
  )
}

export default ColorPicker
