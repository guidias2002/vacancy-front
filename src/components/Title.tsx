interface TitleProps {
    title: string;
    subTitle: string;
}

const Title: React.FC<TitleProps> = ({title, subTitle}) => {

    return (
        <div className='flex flex-col w-full items-start my-0 mx-auto gap-1 font-montserrat'>
            <p className='text-4xl'>{title}</p>
            <p className='text-lg text-sub-title'>{subTitle}</p>
        </div>
    )
}

export default Title;