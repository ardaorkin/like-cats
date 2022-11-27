import { useAtom } from "jotai";
import { ReactElement } from "react";
import { currentImageAtom, ILike, parsedLikes } from "../store";
import thumbsUp from "bootstrap-icons/icons/hand-thumbs-up.svg";
import thumbsDown from "bootstrap-icons/icons/hand-thumbs-down.svg";

export interface IPersonCardProps {
  images: string[];
  username: string;
  idx: number;
}

export default function PersonCard({
  images,
  username,
  idx,
}: IPersonCardProps): ReactElement {
  const [currentImage, setCurrentImage] = useAtom(currentImageAtom);
  const [, setLikes] = useAtom(parsedLikes);

  const handleForward = () => {
    if (currentImage < images.length - 1) {
      setCurrentImage((currentImage) => currentImage + 1);
    }
  };

  const handlePreview = () => {
    if (currentImage > 0) {
      setCurrentImage((currentImage) => currentImage - 1);
    }
  };
  const handleLike = () => {
    setLikes({ username: "test" });
  };

  const handleDislike = () => console.log("dislike");
  return (
    <div className={`absolute w-full h-full bg-slate-50 z-${idx * 10}`}>
      <div
        className="relative w-full h-5/6 bg-contain bg-no-repeat bg-bottom bg-transparent"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <button className="absolute left-0 bottom-0 bg-transparent border-transparent hover:border-transparent hover:ring-0 hover:bg-transparent z-10 hover:scale-105">
          <span className="text-3xl text-white drop-shadow-md">{username}</span>
        </button>
        <div
          className="bg-transparent w-6/12 float-left h-full cursor-pointer"
          onClick={handleForward}
        ></div>
        <div
          className="bg-transparent w-6/12 float-right h-full cursor-pointer"
          onClick={handlePreview}
        ></div>
      </div>
      <button
        className="absolute w-4/12 h-12 bottom-0 left-0 border-transparent bg-transparent hover:border-transparent hover:ring-0 hover:bg-transparent hover:scale-105	 bg-no-repeat bg-contain focus:outline-none"
        onClick={handleLike}
        style={{ backgroundImage: `url(${thumbsUp})` }}
      ></button>
      <button
        className="absolute w-4/12 h-12 bottom-0 right-0 border-transparent bg-transparent hover:border-transparent hover:ring-0 hover:bg-transparent hover:scale-105	 bg-no-repeat bg-contain bg-right focus:outline-none"
        onClick={handleDislike}
        style={{ backgroundImage: `url(${thumbsDown})` }}
      ></button>
    </div>
  );
}
