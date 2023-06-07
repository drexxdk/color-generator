import { type NextPage } from "next";
import Head from "next/head";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { type Color } from "~/types/color";
import getColors from "~/utils/getColors";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

const Home: NextPage = () => {
  const [prefix, setPrefix] = useState<string>("color-");
  const [suffix, setSuffix] = useState<string>("");

  const [variants, setVariants] = useState<number>(5);
  const [numberInterval, setNumberInterval] = useState<number>(100);

  const [backgroundHex, setBackgroundHex] = useState<string>("#ff0000");
  const [textLightHex, setTextLightHex] = useState<string>("#ffffff");
  const [textDarkHex, setTextDarkHex] = useState<string>("#000000");

  const [halfNumberForFirstAndLast, setHalfNumberForFirstAndLast] =
    useState<boolean>(true);
  const [showHeadlines, setShowHeadlines] = useState<boolean>(true);
  const [showRatios, setShowRatios] = useState<boolean>(true);

  const [items, setItems] = useState<Color[]>();

  useEffect(() => {
    setItems(
      getColors({
        prefix,
        suffix,
        variants,
        numberInterval,
        halfNumberForFirstAndLast,
        backgroundHex,
        textLightHex,
        textDarkHex,
      })
    );
  }, [
    prefix,
    suffix,
    variants,
    numberInterval,
    halfNumberForFirstAndLast,
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
        <div className="mx-auto grid w-full max-w-3xl gap-8 @container">
          <form className="grid gap-8 @container">
            <div className="grid gap-8 @md:grid-cols-2 @4xl:grid-cols-4">
              <InputGroup1>
                <Input
                  type="text"
                  name="prefix"
                  placeholder=" "
                  value={prefix}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPrefix(e.target.value)
                  }
                />
                <Label htmlFor="prefix">Prefix</Label>
              </InputGroup1>

              <InputGroup1>
                <Input
                  type="text"
                  name="suffix"
                  placeholder=" "
                  value={suffix}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSuffix(e.target.value)
                  }
                />
                <Label htmlFor="prefix">Suffix</Label>
              </InputGroup1>

              <InputGroup1>
                <Input
                  type="number"
                  name="variants"
                  placeholder=" "
                  value={variants}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = Number(e.target.value);
                    setVariants(value);
                  }}
                  min={0}
                  max={25}
                />
                <Label htmlFor="variants">Variants</Label>
              </InputGroup1>

              <InputGroup1>
                <Input
                  type="number"
                  name="interval"
                  placeholder=" "
                  value={numberInterval}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = Number(e.target.value);
                    setNumberInterval(value || 1);
                  }}
                  min={1}
                />
                <Label htmlFor="interval">Interval</Label>
              </InputGroup1>
            </div>

            <div className="grid gap-8 @md:grid-cols-3 @4xl:grid-cols-6">
              <InputGroup2>
                <Headline>Background</Headline>
                <input
                  name="backgroundHex"
                  type="color"
                  value={backgroundHex}
                  onChange={(e) => setBackgroundHex(e.target.value)}
                ></input>
              </InputGroup2>
              <InputGroup2>
                <Headline>Text light</Headline>
                <input
                  name="textLightHex"
                  type="color"
                  value={textLightHex}
                  onChange={(e) => setTextLightHex(e.target.value)}
                ></input>
              </InputGroup2>

              <InputGroup2>
                <Headline>Text Dark</Headline>
                <input
                  name="textDarkHex"
                  type="color"
                  value={textDarkHex}
                  onChange={(e) => setTextDarkHex(e.target.value)}
                ></input>
              </InputGroup2>

              <InputGroup2>
                <Headline>Half number for first and last</Headline>
                <Checkbox
                  checked={halfNumberForFirstAndLast}
                  onChange={(e) => {
                    setHalfNumberForFirstAndLast(e.target.checked);
                  }}
                >
                  Enabled
                </Checkbox>
              </InputGroup2>

              <InputGroup2>
                <Headline>Show headlines</Headline>
                <Checkbox
                  checked={showHeadlines}
                  onChange={(e) => {
                    setShowHeadlines(e.target.checked);
                  }}
                >
                  Enabled
                </Checkbox>
              </InputGroup2>

              <InputGroup2>
                <Headline>Show Ratios</Headline>
                <Checkbox
                  checked={showRatios}
                  onChange={(e) => {
                    setShowRatios(e.target.checked);
                  }}
                >
                  Enabled
                </Checkbox>
              </InputGroup2>
            </div>
          </form>

          <div className="grid w-full justify-center overflow-auto">
            {items?.length ? (
              <table className="border-collapse">
                {showHeadlines && (
                  <thead>
                    <tr>
                      <Th>Name</Th>
                      <Th>Background</Th>
                      <Th>Text light</Th>
                      {showRatios && (
                        <>
                          <Th>AA L</Th>
                          <Th>AA S</Th>
                          <Th>AAA L</Th>
                          <Th>AAA S</Th>
                        </>
                      )}
                      <Th>Text dark</Th>
                      {showRatios && (
                        <>
                          <Th>AA L</Th>
                          <Th>AA S</Th>
                          <Th>AAA L</Th>
                          <Th>AAA S</Th>
                        </>
                      )}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {items.map((item, i) => {
                    return (
                      <tr
                        key={i}
                        style={{
                          backgroundColor: item.background,
                          color: item.ideal?.value,
                        }}
                      >
                        <Td>{item.name}</Td>
                        <Td>{item.background}</Td>
                        <Td>{item.light?.value}</Td>
                        {showRatios && (
                          <>
                            <Td>
                              <Ratio
                                ratio={item.light?.ratio}
                                validation={1 / 3}
                              />
                            </Td>
                            <Td>
                              <Ratio
                                ratio={item.light?.ratio}
                                validation={1 / 4.5}
                              />
                            </Td>
                            <Td>
                              <Ratio
                                ratio={item.light?.ratio}
                                validation={1 / 4.5}
                              />
                            </Td>
                            <Td>
                              <Ratio
                                ratio={item.light?.ratio}
                                validation={1 / 7}
                              />
                            </Td>
                          </>
                        )}
                        <Td>{item.dark?.value}</Td>
                        {showRatios && (
                          <>
                            <Td>
                              <Ratio
                                ratio={item.dark?.ratio}
                                validation={1 / 3}
                              />
                            </Td>
                            <Td>
                              <Ratio
                                ratio={item.dark?.ratio}
                                validation={1 / 4.5}
                              />
                            </Td>
                            <Td>
                              <Ratio
                                ratio={item.dark?.ratio}
                                validation={1 / 4.5}
                              />
                            </Td>
                            <Td>
                              <Ratio
                                ratio={item.dark?.ratio}
                                validation={1 / 7}
                              />
                            </Td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <>Nothing to show</>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const InputGroup1 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={classNames("group relative z-0 mt-[10px] w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
};
const InputGroup2 = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={classNames(
        "flex w-full flex-col items-center justify-center text-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Input = ({ ...props }) => {
  return (
    <input
      className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-0"
      {...props}
    />
  );
};

const Label = ({ children, ...props }: ComponentPropsWithoutRef<"label">) => {
  return (
    <label
      {...props}
      className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm  text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75  peer-focus:font-medium peer-focus:text-blue-500"
    >
      {children}
    </label>
  );
};

const Checkbox = ({
  children,
  checked,
  onChange,
}: {
  children: ReactNode;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 ring-offset-gray-800 focus:ring-2 focus:ring-blue-600"
      />
      {children}
    </label>
  );
};

const Headline = ({ children }: { children: ReactNode }) => {
  return <h2 className="mb-1 text-[10.5px] text-gray-400">{children}</h2>;
};

const Ratio = ({
  ratio,
  validation,
}: {
  ratio?: number;
  validation: number;
}) => {
  return ratio ? (
    <div className="p rounded-full bg-black">
      {ratio < validation ? (
        <CheckCircleIcon className="h-6 w-6 text-green-500" />
      ) : (
        <XCircleIcon className="h-6 w-6 text-red-500" />
      )}
    </div>
  ) : null;
};

const Th = ({
  children,
  colspan = 1,
}: {
  children: ReactNode;
  colspan?: number;
}) => {
  return (
    <th
      className="relative h-28 border border-gray-500 px-2 text-left"
      colSpan={colspan}
    >
      <span className="absolute bottom-2 left-[50%] origin-bottom-left rotate-[285deg] whitespace-nowrap">
        {children}
      </span>
    </th>
  );
};

const Td = ({
  children,
  colspan = 1,
}: {
  children: ReactNode;
  colspan?: number;
}) => {
  return (
    <td className="border border-gray-500 px-2" colSpan={colspan}>
      {children}
    </td>
  );
};

export default Home;
