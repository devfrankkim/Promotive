import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { clockState, ClockVersionState, getTime } from "recoil/clock";

import styled from "styled-components";
import {
  CLOCK_VERSION,
  handleClockVersionLocalStorage,
  handleMomentumNameLocalStorage,
  momentumLocalName,
} from "utils/helpers";

type TMomentumRegister = {
  momentumRegisterForm: string;
};

const MOMENTTUM_REGISTER = "momentumRegisterForm";

const Momentum = () => {
  const [momentumName, setMomentumName] = useState(momentumLocalName);
  const [clockVersion, setClockVersion] = useRecoilState(ClockVersionState);
  const [timeState, setTimeState] = useRecoilState(clockState);

  // =========== useForm ===========
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TMomentumRegister>();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeState(getTime(Number(clockVersion)));
    }, 1000);

    return () => clearInterval(interval);
  }, [clockVersion, setTimeState, setClockVersion]);

  // =========== handle 24-hour-clock ===========
  const onHandleClock = () => {
    const TIME = JSON.parse(localStorage.getItem(CLOCK_VERSION) as any);

    TIME === 24
      ? handleClockVersionLocalStorage(12)
      : handleClockVersionLocalStorage(24);

    TIME === 24 ? setClockVersion(12) : setClockVersion(24);
  };

  // =========== useForm submit ===========
  const handleValid = ({ momentumRegisterForm }: TMomentumRegister, e: any) => {
    e.preventDefault();
    setMomentumName(momentumRegisterForm);
    handleMomentumNameLocalStorage(momentumRegisterForm);

    // ------ clear the value ------
    setValue(MOMENTTUM_REGISTER, "");
  };

  return (
    <>
      <TextSpan>{timeState[0]}</TextSpan>
      <TextSpan>Hello, What's your name?</TextSpan>
      <TextSpan>
        {timeState[1]} {momentumName}.
      </TextSpan>
      <button onClick={onHandleClock}>24 hour clock</button>
      <form onSubmit={handleSubmit(handleValid)}>
        <InputBox
          type="text"
          {...register(MOMENTTUM_REGISTER, {
            required:
              "Please let us know how to address you. This is required.",
            validate: {
              minLength: (value) => {
                return value.length < 3 ? "too short! minimum 3 letters" : true;
              },
            },
          })}
          placeholder={"what's your name?"}
          defaultValue={momentumName}
        />
        <ErrorSpan>{errors?.momentumRegisterForm?.message}</ErrorSpan>
      </form>
    </>
  );
};

export default Momentum;

const ErrorSpan = styled.span`
  color: red;
  width: 100%;
  padding: 0;
  /* position: absolute; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: none;
  caret-color: black;
  font-weight: 500;
  line-height: normal;
  outline: none;
  text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TextSpan = styled.span`
  /* padding-bottom: 15px;
  line-height: 1.2;
  white-space: normal;
  caret-color: black;
  color: red; */
`;

const InputBox = styled.input`
  color: red;
  width: 100%;
  padding: 0;
  /* position: absolute; */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: none;
  caret-color: black;
  font-weight: 500;
  line-height: normal;
  outline: none;
  text-align: center;
  border-bottom: 1px solid black;
`;
