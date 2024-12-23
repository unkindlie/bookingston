"use client";

import { useParams } from "next/navigation";

const ParamPage = () => {
    const params = useParams<{ id: string }>();

    return (
        <div>
            <span>{params.id}</span>
        </div>
    );
};

export default ParamPage;
