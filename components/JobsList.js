import { Job } from "./Job"

export const JobsList = ({ jobs }) => {
  return (
    <>
      {jobs.map((job, i) => (
        <Job key={ i } job={ job } />
      ))}
    </>
  )
}
