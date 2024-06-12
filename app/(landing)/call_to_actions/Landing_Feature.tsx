import React from 'react'
import FeatureCard from '../components/FeatureBox'
import Search_Icon from '@/public/assets/svg/Search_Icon'
import { FaRunning } from 'react-icons/fa'
import { GrMultiple } from 'react-icons/gr'
import { VscEditorLayout } from 'react-icons/vsc'
import { FaPersonChalkboard } from 'react-icons/fa6'
import { GiArtificialHive } from 'react-icons/gi'
import { RiRoadMapLine } from 'react-icons/ri'

const LandingFeature: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-transparent ">
      <h1 className="large_title pb-5">Features</h1>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-10 overflow-y-auto">
        <FeatureCard
          title="Ai Assistance"
          content="Leverage advanced AI technology to receive personalized guidance and automated suggestions for crafting the perfect CV, tailored to your desired job position."
          svgImage={GiArtificialHive}
        />
        <FeatureCard
          title="Roadmap Generation"
          content="Generate a detailed roadmap outlining the steps needed to become a well-rounded candidate, helping you align your skills and experience with industry expectations."
          svgImage={RiRoadMapLine}
        />
        <FeatureCard
          title="Personalised Feedback"
          content="Receive constructive feedback on your CV to understand your strengths and areas for improvement, ensuring your resume stands out to potential employers."
          svgImage={FaPersonChalkboard}
        />
        <FeatureCard
          title="Customized Editor"
          content="Utilize a flexible, user-friendly editor to tailor your CV with ease, ensuring it meets specific job requirements and highlights your unique qualifications."
          svgImage={VscEditorLayout}
        />
        <FeatureCard
          title="Multiple CVs"
          content="Effortlessly create and manage multiple CVs tailored to different job applications, ensuring each resume is perfectly suited for the desired position."
          svgImage={GrMultiple}
        />
        <FeatureCard
          title="Fast Creation"
          content="Quickly generate professional, high-quality CVs using our AI-powered platform, saving time and simplifying the job application process."
          svgImage={FaRunning}
        />
      </div>
    </div>
  )
}

export default LandingFeature
/*
<div className="flex flex-col md:flex-row justify-around items-center">
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px', borderRadius: '50px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 1" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 2" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 3" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s </p>
        </div>
      </div>
*/
