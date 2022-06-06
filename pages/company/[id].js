import { Job } from "components/Job";
import { getCompany, getCompanyJobs } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";

const CompanyPage = ({ jobs, company }) => {

  return (
    <div className="mt-10">
      <div className="text-center p-4 m-4">
        <Link href={ '/' }>
          <a href="" className="mb-10 text-sm font-bold underline">
            Back
          </a>
        </Link>
      </div>

      <div className="text-center p-4 m-4">
        <h2 className="mb-10 text-4xl font-bold">
          Profile of { company.name }
        </h2>
      </div>
      <div className="mb-4 mt-20">
        <div className="pl-16 pr-16 -mt-16">
          <p className="text-center text-xl font-bold">Company jobs</p>
          { jobs.map((job, i) => (
            <Job key={ i } job={ job } />
          ))}
        </div>
      </div>
    </div>
  )
};

export const getServerSideProps = async ({ params }) => {
  let company = await getCompany(params.id, prisma);
  let jobs = await getCompanyJobs(params.id, prisma);
  company = JSON.parse(JSON.stringify(company));
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs, 
      company,
    }
  }
}

export default CompanyPage;