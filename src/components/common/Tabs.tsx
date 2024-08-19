import { Link } from "@tanstack/react-router";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useRef, useEffect, useState } from "react";
import '../../styles/common/Tabs.scss';

type TProps = {
  url: string;
  params: any;
  setFunction: any;
  tabTypes: any;
  lenInfo: number;
}

const Tabs = ({ url, params, setFunction, tabTypes, lenInfo }: TProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const currentTab: HTMLDivElement | null = tabRefs.current[activeTab];
    if (currentTab && indicatorRef.current) {
      indicatorRef.current.style.width = `${currentTab.offsetWidth}px`;
      indicatorRef.current.style.transform = `translateX(${currentTab.offsetLeft}px)`;
    }
  }, [activeTab]);
  
  return(
    <div className="tab-container">
      <Link className="link" to={url} params={params}>
        <IoChevronForwardSharp className="link__icon"/>
      </Link>

      <div className="tabs">
        {tabTypes[0].map((tab: string, idx: number) => (
          <div
            key={idx}
            className="tabs__tab"
            onClick={() => { setActiveTab(idx); setFunction(tab);}}
            ref={el => tabRefs.current[idx] = el!}
          >
            <div className="tabs__tab__content">
              <div className="tabs__tab__content__title">{tabTypes[1][idx]}</div>
              {idx===activeTab && <div className="tabs__tab__content__len">{lenInfo}</div>}
            </div>
          </div>
        ))}
        <div className="tabs__indicator" ref={indicatorRef}></div>
      </div>

    </div>
  );
}

export default Tabs;