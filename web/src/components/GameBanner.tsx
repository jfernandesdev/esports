import { Link } from 'react-router-dom'

interface GameBannerProps {
  id: string
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({id, bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <Link to={`game/${id}`}>
      <a className="relative rounded-lg overflow-hidden">
        <img src={bannerUrl} alt={title} className="object-cover h-[325px] md:h-[260px] w-full"/>

        <div className="w-full  pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
          <strong className="font-bold text-white block truncate ">{title}</strong>
          <span className="text-sm text-zinc-300 block">
            {(adsCount > 1) ? `${adsCount} anúncios` : `${adsCount} anúncio`}
          </span>
        </div>
      </a>
    </Link>
  )
}