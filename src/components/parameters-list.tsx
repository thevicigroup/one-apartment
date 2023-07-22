"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Parameter, useApartmentContext } from "@/components/providers";

export const ParametersList = () => {
    const { parameters } = useApartmentContext();
    return (
        <ScrollArea>
            <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-2">
                Search Parameters
            </h1>
            {parameters && parameters.length > 0 ? (
                <div className="space-y-2">
                    {parameters.map((param, i) => (
                        <SingleParameter key={`${param.nickname}-${i}`} param={param} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center w-full pt-12">
                    <div className="flex items-center space-x-2">
                        <Search className="h-5 w-5" />
                        <p className="text-center font-medium">No search parameters yet.</p>
                    </div>
                    <p className="text-sm">
                        Add a new parameter above or{" "}
                        <span className="underline-offset-4 underline">import</span> saved
                        parameters.
                    </p>
                </div>
            )}
        </ScrollArea>
    );
};

interface Props {
    param: Parameter;
}

// TODO(jack): Breakout parameter "operations" into seperate component so this can be server component. Make client components closer to leaves of component tree.
export const SingleParameter: React.FC<Props> = ({ param }) => {
    const router = useRouter();
    const { delParameter, saveParameter } = useApartmentContext();
    return (
        <Card>
            <div className="flex items-center justify-between px-4 py-2">
                <CardTitle>{param.nickname}</CardTitle>
                <div className="flex items-center space-x-2">
                    {param.isSaved ? (
                        <div className="flex items-center">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Saved</span>
                        </div>
                    ) : (
                        <Button
                            variant="success"
                            size="sm"
                            onClick={() => {
                                saveParameter(param);
                                router.refresh();
                            }}
                        >
                            Save
                        </Button>
                    )}
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                            delParameter(param.id);
                            router.refresh();
                        }}
                    >
                        Remove
                    </Button>
                </div>
            </div>
            <Separator />
            <CardContent>
                {param.address} in {param.traveltime} minutes {"by "}
                {param.travelmode}.
            </CardContent>
        </Card>
    );
};
