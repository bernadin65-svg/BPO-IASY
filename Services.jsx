import React from 'react'

import assets from '../assets/assets'

import Title from './Title'
import ServiceCard from './ServiceCard'
import { motion } from "motion/react"



const Services = () => {

    const ServicesData = [

        {

            title: 'Publicité',

            description: 'Boostez votre visibilité grâce à une publicité intelligente, pilotée par des experts en externalisation.',

            icon: assets.ads_icon
        },
{

            title: 'Comptabilité',

            description: 'Nous prenons en charge vos opérations comptables pour assurer un suivi précis et conforme de vos finances.',
            icon: assets.marketing_icon,
        },

          {

            title: 'Gestion des emails / back-office',

            description: 'Externalisez la gestion de vos emails et tâches administratives pour améliorer votre productivité et votre organisation.',

            icon: assets.content_icon,
        },

          {

            title: 'Transcription audio / vidéo',

            description: 'Transformez vos contenus audio et vidéo en textes clairs, précis et exploitables rapidement.',

            icon: assets.social_icon,


        },

    ] 

    return (

        <motion.div
        initial="hidden"
      whileInView="visible"
      
      viewport={{once: true}}
      transition={{staggerChildren: 0.2}}

        
        
        id='Services' className='relative flex
         flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>


<img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 -z-1 dark:hidden'/>

 <Title Title='Comment pouvons nous vous aidez?' desc='Nous vous aidons à
  réduire vos couts, accélérer votre croissance et maximiser votre rentabilité.'/>

 <motion.div className='flex flex-col md:grid grid-cols-2'>

    {ServicesData.map((service, index)=>(

< ServiceCard key={index} service={service} index={index} />

    ))}

 </motion.div>

        </motion.div>
    )
}

 export default Services 