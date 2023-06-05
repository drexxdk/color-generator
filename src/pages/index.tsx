import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { type Color } from "~/types/color";
import getColors from "~/utils/getColors";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const Home: NextPage = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [prefix, setPrefix] = useState<string>("color-");
  const [suffix, setSuffix] = useState<string>("");
  const [numberInterval, setNumberInterval] = useState<number>(100);
  const [variants, setVariants] = useState<number>(5);
  const [halfNumberForFirstAndLast, setHalfNumberForFirstAndLast] =
    useState<boolean>(true);

  const [textLightHex, setTextLightHex] = useState<string>("#ffffff");
  const [textDarkHex, setTextDarkHex] = useState<string>("#000000");
  const [backgroundHex, setBackgroundHex] = useState<string>("#ff0000");

  const [items, setItems] = useState<Color[]>();

  useEffect(() => {
    setItems(
      getColors({
        prefix,
        suffix,
        halfNumberForFirstAndLast,
        numberInterval,
        variants,
        backgroundHex,
        textLightHex,
        textDarkHex,
      })
    );
  }, [
    prefix,
    suffix,
    halfNumberForFirstAndLast,
    numberInterval,
    variants,
    backgroundHex,
    textLightHex,
    textDarkHex,
  ]);

  return (
    <>
      <Head>
        <title>Color generator</title>
        <meta name="description" content="Color generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <div className="container mx-auto">
          <h1 className="mb-5 border-b border-gray-500 pb-5 font-bold">
            Color generator
          </h1>
          <div className="flex flex-wrap gap-5">
            <div className="grow basis-80 @container">
              <h2 className="pb-2 font-bold">Settings</h2>
              <table className="w-full">
                <tbody>
                  <RenderTr>
                    <RenderTh>Prefix</RenderTh>
                    <RenderTd>
                      <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className="w-full border border-gray-500"
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Suffix</RenderTh>
                    <RenderTd>
                      <input
                        type="text"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                        className="w-full border border-gray-500"
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Variants</RenderTh>
                    <RenderTd>
                      <input
                        type="number"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setVariants(value);
                        }}
                        className="w-full border border-gray-500"
                        value={variants}
                        min={0}
                        max={25}
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Number Interval</RenderTh>
                    <RenderTd>
                      <input
                        type="number"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setNumberInterval(value || 1);
                        }}
                        className="w-full border border-gray-500"
                        value={numberInterval}
                        min={1}
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Half number for first and last</RenderTh>
                    <RenderTd>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setHalfNumberForFirstAndLast(e.target.checked);
                        }}
                        checked={halfNumberForFirstAndLast}
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Background color</RenderTh>
                    <RenderTd>
                      <HexColorPicker
                        color={backgroundHex}
                        onChange={setBackgroundHex}
                        className="!w-auto"
                      />
                      <HexColorInput
                        color={backgroundHex}
                        onChange={setBackgroundHex}
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Text light</RenderTh>
                    <RenderTd>
                      <HexColorPicker
                        color={textLightHex}
                        onChange={setTextLightHex}
                        className="!w-auto"
                      />
                      <HexColorInput
                        color={textLightHex}
                        onChange={setTextLightHex}
                      />
                    </RenderTd>
                  </RenderTr>

                  <RenderTr>
                    <RenderTh>Text dark</RenderTh>
                    <RenderTd>
                      <HexColorPicker
                        color={textDarkHex}
                        onChange={setTextDarkHex}
                        className="!w-auto"
                      />
                      <HexColorInput
                        color={textDarkHex}
                        onChange={setTextDarkHex}
                      />
                    </RenderTd>
                  </RenderTr>
                </tbody>
              </table>
            </div>
            <div className="grow basis-80">
              <h2 className="pb-2 font-bold">Preview</h2>
              {items?.length ? (
                <ul>
                  {items.map((item, i) => {
                    return (
                      <li key={i}>
                        <ul
                          className="wrap flex gap-2 p-2"
                          style={{
                            backgroundColor: item.background,
                          }}
                        >
                          <li className=" bg-gray-600 p-2 text-white">
                            <h4 className="font-bold">{item.background}</h4>{" "}
                            <h3 className="whitespace-nowrap font-bold">
                              {item.name}
                            </h3>
                          </li>
                          <li
                            style={{ color: item.texts.light?.value }}
                            className="text-center"
                          >
                            <h4 className="font-bold">
                              {item.texts.light?.value}
                            </h4>
                            {item.texts.light?.ratio ? (
                              <ul className="flex flex-wrap justify-center gap-2">
                                <li className="flex items-center gap-2">
                                  AA L:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.light.ratio < 1 / 3 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center gap-2">
                                  AA S:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.light.ratio < 1 / 4.5 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center gap-2">
                                  AAA L:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.light.ratio < 1 / 4.5 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center gap-2">
                                  AAA S:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.light.ratio < 1 / 7 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                              </ul>
                            ) : null}
                          </li>
                          <li
                            style={{ color: item.texts.dark?.value }}
                            className="text-center"
                          >
                            <h4 className="font-bold">
                              {item.texts.dark?.value}
                            </h4>
                            {item.texts.dark?.ratio ? (
                              <ul className="flex flex-wrap justify-center gap-2">
                                <li className="flex items-center gap-2">
                                  AA L:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.dark.ratio < 1 / 3 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center gap-2">
                                  AA S:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.dark.ratio < 1 / 4.5 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center gap-2">
                                  AAA L:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.dark.ratio < 1 / 4.5 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                                <li className="flex items-center gap-2">
                                  AAA S:
                                  <div className="p rounded-full bg-black">
                                    {item.texts.dark.ratio < 1 / 7 ? (
                                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                                    ) : (
                                      <XCircleIcon className="h-6 w-6 text-red-500" />
                                    )}
                                  </div>
                                </li>
                              </ul>
                            ) : null}
                          </li>
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <>Nothing to show</>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const RenderTr = ({ children }: { children: ReactNode }) => {
  return <tr className="block @sm:table-row">{children}</tr>;
};

const RenderTh = ({
  children,
  colspan = 1,
}: {
  children: ReactNode;
  colspan?: number;
}) => {
  return (
    <th
      className="block p-2 text-left @sm:table-cell @sm:max-w-[100px] @sm:text-right"
      colSpan={colspan}
    >
      {children}
    </th>
  );
};

const RenderTd = ({
  children,
  colspan = 1,
}: {
  children: ReactNode;
  colspan?: number;
}) => {
  return (
    <td className="block p-2 @sm:table-cell" colSpan={colspan}>
      {children}
    </td>
  );
};

export default Home;
