import { Job } from "./Job"

export const JobsList = ({ jobs, isDashboard }) => {
  return (
    <>
      {jobs.map((job, i) => (
        <Job key={ i } job={ job } isDashboard={ isDashboard } />
      ))}
    </>
  )
}
