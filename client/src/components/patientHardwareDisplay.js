import React from 'react'

function PatientHardwareDisplay({ hardware }) {

  function formatHardware() {
    if (hardware.length === 0) {
      return <></>
    } else {
      return (
        <>
          <span style={{ fontWeight: 'bold' }}>Selected Patient's Hardware: </span> {hardware}
        </>
      )
    }
  }
  return (
    <div>
      {formatHardware()} <br/>
    </div>
  )
}

export default PatientHardwareDisplay