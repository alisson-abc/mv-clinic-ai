import svgPaths from "./svg-quqbpcgsif";
import imgImageAac8568754F24D4EA1186Cb5E6195E751 from "figma:asset/8848aa10546e281f1f6071ccae1ceb6ea6d8c0b8.png";
import imgImageBbf04Cf744Ee4A43930AA0Dcde22Dbca1 from "figma:asset/f62b818f4610056b08b173f9701df5af8be42829.png";
import imgImage7F7406Cb0Ade4C41A43ACe4C127Acbf41 from "figma:asset/f00e914f79c41a28a70bca5fbe7ea74cd38f5960.png";
import imgImageD7D8792B93C54D4B9F9338B11Fa8E9341 from "figma:asset/069a9a109ade2aedc270522cc2bf37c2f0017f31.png";
import imgLogoMvComAssinaturas22 from "figma:asset/f07ce0ef45a6df48f6c586d9ef7ccd7274d5089a.png";
import imgLogoMvVertical2 from "figma:asset/a3433974f449481b3f756eaeec5928ae265c669d.png";

function ImageAac8568754F24D4EA1186Cb5E6195E() {
  return (
    <div className="absolute left-[3753px] overflow-clip size-[1024px] top-[430px]" data-name="image_aac85687-54f2-4d4e-a118-6cb5e6195e75 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImageAac8568754F24D4EA1186Cb5E6195E751} />
      </div>
    </div>
  );
}

function ImageBbf04Cf744Ee4A43930AA0Dcde22Dbca() {
  return (
    <div className="absolute h-[768px] left-[76px] overflow-clip top-[2021px] w-[1376px]" data-name="image_bbf04cf7-44ee-4a43-930a-a0dcde22dbca 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImageBbf04Cf744Ee4A43930AA0Dcde22Dbca1} />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[-0.02%_0_-0.01%_0]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 200.152 73.9452">
        <g id="Group 33542">
          <path d={svgPaths.p2f16cb70} fill="var(--fill-0, #08194D)" id="Path 10554" />
          <g id="Group 33544">
            <path d={svgPaths.pd6cacc0} fill="var(--fill-0, #B55CAF)" id="Path 7188" />
            <path d={svgPaths.p2f4f1300} fill="var(--fill-0, #35D3C7)" id="Path 7189" />
            <path d={svgPaths.p32f02a80} fill="var(--fill-0, #365FD7)" id="Path 7190" />
            <path d={svgPaths.p18b86280} fill="var(--fill-0, #0B4796)" id="Intersection 1" />
            <path d={svgPaths.p399c1080} fill="var(--fill-0, #0B4796)" id="Intersection 2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function SofyaLogo() {
  return (
    <div className="absolute h-[73.923px] left-[284px] overflow-clip top-[1238px] w-[200.155px]" data-name="sofya-logo 1">
      <Group />
    </div>
  );
}

export default function IconesEIlustracoes() {
  return (
    <div className="bg-white relative size-full" data-name="Icones e Ilustrações">
      <div className="absolute left-[284px] size-[1024px] top-[174px]" data-name="image_7f7406cb-0ade-4c41-a43a-ce4c127acbf4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage7F7406Cb0Ade4C41A43ACe4C127Acbf41} />
      </div>
      <div className="absolute left-[1348px] size-[1024px] top-[174px]" data-name="image_d7d8792b-93c5-4d4b-9f93-38b11fa8e934 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageD7D8792B93C54D4B9F9338B11Fa8E9341} />
      </div>
      <ImageAac8568754F24D4EA1186Cb5E6195E />
      <ImageBbf04Cf744Ee4A43930AA0Dcde22Dbca />
      <SofyaLogo />
      <div className="absolute h-[768px] left-[2561px] top-0 w-[1120px]" data-name="Logo-MV-com-assinaturas (2) 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoMvComAssinaturas22} />
      </div>
      <div className="absolute h-[1136px] left-[2561px] top-[686px] w-[819px]" data-name="Logo-MV-vertical 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoMvVertical2} />
      </div>
    </div>
  );
}