'use client';

import { useState } from "react";

const useModal = () => {
    const [open, setOpen] = useState(false);

    const invertOpen = () => setOpen(!open);

    return { open, invertOpen };
};

export { useModal };
