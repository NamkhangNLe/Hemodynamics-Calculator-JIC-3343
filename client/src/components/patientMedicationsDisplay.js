import React from 'react'

function PatientMedicationsDisplay({ medications }) {

  function formatMedications() {
    if (medications.length === 0) {
      return <></>
    } else {
      return (
        <>
          <span style={{ fontWeight: 'bold' }}>Selected Patient's Medications: </span> {medications}
        </>
      )
    }
  }
  return (
    <div>
      {formatMedications()} <br/>
    </div>
  )
}

export default PatientMedicationsDisplay