"use client";
import information from "@/public/video_information.png";
import graph from "@/public/comment_graph.png";
import section from "@/public/comment_section.png";
import insights from "@/public/comment_insights.png";

import Image, { StaticImageData } from "next/image";
import { Tabs } from "@/components/ui/tabs2";

export function TabsDemo() {
  const tabs = [
    {
      title: "Information",
      value: "information",
      img: information,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Information</p>
          <DummyContent img={information} />
        </div>
      ),
    },
    {
      title: "Graphs",
      value: "graphs",
      img: graph,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Visual Graphs</p>
          <DummyContent img={graph} />
        </div>
      ),
    },
    {
      title: "Categories",
      value: "comment_category_section",
      img: section,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Section</p>
          <DummyContent img={section} />
        </div>
      ),
    },
    {
      title: "Insights",
      value: "insights",
      img: insights,
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Insights</p>
          <DummyContent img={insights} />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[20rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mb-12">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = ({img}: {img: StaticImageData}) => {
  return (
    <Image
      src={img}
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-contain object-left-top h-[80%] md:h-[70%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto mb-4"
    />
  );
};
