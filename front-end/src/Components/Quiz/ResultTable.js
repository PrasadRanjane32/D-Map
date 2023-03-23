import React from 'react'

const ResultTable = () => {
  return (
    <>
        <table>
            <thead className='table-header'>
            <tr className='table-row'>
                <td>Name</td>
                <td>Attempts</td>
                <td>Earn Points</td>
                <td>Result</td>

            </tr>


            </thead>
            <tbody>
            <tr className='table-body'>
                <td>username</td>
                <td>05</td>
                <td>20</td>
                <td>Pass</td>
            </tr>

            </tbody>
        </table>
    </>
  )
}

export default ResultTable