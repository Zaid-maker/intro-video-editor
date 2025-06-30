import { z } from "zod";
import { AlignEnd } from "@/components/AlignEnd";
import { Button } from "@/components/Button";
import { InputContainer } from "@/components/Container";
import { DownloadButton } from "@/components/DownloadButton";
import { ErrorComp } from "@/components/Error";
import { Input } from "@/components/Input";
import { ProgressBar } from "@/components/ProgressBar";
import { Spacing } from "@/components/Spacing";
import { COMP_NAME, CompositionProps } from "../../types/constants";
import { useRendering } from "@/helpers/use-rendering";

export const RenderControls: React.FC<{
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ text, setText, inputProps }) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <InputContainer>
      {state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error" ? (
        <>
          <Input
            disabled={state.status === "invoking"}
            setText={setText}
            text={text}
          ></Input>
          <Spacing></Spacing>
          <AlignEnd>
            <Button
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      ) : null}
      {state.status === "rendering" || state.status === "done" ? (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
          <Spacing></Spacing>
          <AlignEnd>
            <DownloadButton undo={undo} state={state}></DownloadButton>
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  );
};
