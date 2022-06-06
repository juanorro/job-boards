import { JobsList } from "components/JobsList";
import { getJobs } from "lib/data";
import prisma from "lib/prisma";


export default function Home({ jobs }) {
  console.log('jobs =>', jobs);
  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">Find a job!</h2>
      </div>
      <JobsList jobs={ jobs } />
    </div>
  )
};

export const getServerSideProps = async (ctx) => {
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      jobs,
    }
  }
}
