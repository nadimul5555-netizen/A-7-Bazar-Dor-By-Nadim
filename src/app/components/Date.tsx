'use client'
import React, { useEffect, useState } from 'react';

const DatePage = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    );
  }, []);

  return <span>{date}</span>;
}

export default DatePage;