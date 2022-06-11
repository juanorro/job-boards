import { JobsList } from "components/JobsList";
import { getJobsPosted, getUser } from "lib/data";
import prisma from "lib/prisma";
import { getSession, useSession } from "next-auth/react";

const DashboardPage = ({ jobs, user }) => {

  const { data: session } = useSession();

  console.log('jobs =>', jobs);
  console.log('company =>', user.company);
  console.log('session =>', session);
  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">
          Dashboard
        </h2>
        { user.company && (
          <span className="bg-black text-white uppercase text-sm p-2">
            Company
          </span>
        )}
        { session && (
          <>
            { user.company && (
              <p className="mt-10 mb-10 text-2xl font-normal">
                All the jobs you posted
              </p>
            )}
          </>
        )}
      </div>
      <JobsList jobs={ jobs } isDashboard={ true } />
    </div>
  )
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  let user = await getUser(session.user.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  let jobs = await getJobsPosted(user.id, prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      user,
      jobs
    }
  }
}

export default DashboardPage;