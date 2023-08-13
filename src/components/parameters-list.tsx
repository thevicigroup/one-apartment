"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@radix-ui/react-dialog";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { Check, Divide, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import { userParametersSchema } from "@/lib/validators/search-parameters";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Parameter, useApartmentContext } from "@/components/providers";

import { db } from "@/lib/database";
import axios from "axios";

export async function getServerSideProps(context: any) {
    const response = await axios.get('/api/user/parameter');
    return {
      props: {
        data: response.data,
      },
    };
  }

// TODO: add in length check for 10 parameters max
export const ParametersList = () => {


    const userParameters = ['','','']
    const groupParameters = ['','','']
    // const userParameters = savedUserParameters
    // const groupParameters = userGroups
    const router = useRouter();
    const { parameters } = useApartmentContext();
    const form = useForm<z.infer<typeof userParametersSchema>>({
        resolver: zodResolver(userParametersSchema),
        defaultValues: {
            id: uuid(),
            address: "",
            nickname: "",
            traveltime: "30",
            travelmode: "walking",
            maxPrice: 0,
        },
    });
    const { addParameter } = useApartmentContext();
    async function handleSubmit(values: z.infer<typeof userParametersSchema>) {
        values.id = uuid();
        addParameter(values);
        form.reset();
        router.refresh();
    }


    const UserParametersRows: React.FC<Props> = () => {
        return(
            userParameters.map((userParam, i) => (
            <TableRow>
                <TableCell>
                    userParam.nickname
                    {/* {userParam.nickname} */}
                </TableCell>
                <TableCell>
                    userParam.address
                    {/* {userParam.address} */}
                </TableCell>
                <TableCell className="content-center">
                    <Checkbox />
                </TableCell>
            </TableRow>
            ))
        )
    }



    const GroupParametersRows: React.FC<Props> = () => {
        return(
            groupParameters.map((i) => (
                <TableRow>
                    <TableCell>
                        testGroupParameters.name
                        {/* {testGroupParameters.name} */}
                    </TableCell>
                    <TableCell>
                        testGroupParameters.address
                        {/* {testGroupParameters.address} */}
                    </TableCell>
                    <TableCell className="content-center">
                        <Checkbox />
                    </TableCell>
                </TableRow>
                ))
        )
    }


    


    // form.handleSubmit(handleSubmit) add this in after making the popup a form
    return (
        <div>
            <h1 className="scroll-m-20 text-lg font-bold tracking-tight lg:text-xl py-2">
                Search Parameters
            </h1>

            <ScrollArea className="h-80 scroll-smooth">
                {parameters && parameters.length > 0 ? (
                    <div className="space-y-2 scroll-smooth">
                        {parameters.map((param, i) => (
                            <SingleParameter
                                key={`${param.nickname}-${i}`}
                                param={param}
                                index={i}
                            />
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="maxPrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <AlertDialog>
                                                    
                                                    <AlertDialogTrigger>
                                                        <button className="underline-offset-4 underline">
                                                            import
                                                        </button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent className="bg-white">
                                                        <AlertDialogHeader className="font-bold">
                                                            Your Saved Parameters:
                                                        </AlertDialogHeader>
                                                        <Separator></Separator>
                                                            <Table className="table-auto">
                                                                <TableHeader className="bg-blue-300">
                                                                    <TableRow>
                                                                        <TableHead className="w-[200px] font-bold">
                                                                            Nickname
                                                                        </TableHead>
                                                                        <TableHead className="w-[200px] font-bold">
                                                                            Address
                                                                        </TableHead>
                                                                        <TableHead className="w-[50px] font-bold">
                                                                            Select
                                                                        </TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                
                                                                <TableBody>
                                                                    <UserParametersRows param={{
                                                                        id: "",
                                                                        address: "",
                                                                        nickname: "",
                                                                        traveltime: "",
                                                                        travelmode: "",
                                                                        isSaved: false
                                                                    }} index={0} />
                                                                </TableBody>
                                                            </Table>

                                                        <AlertDialogHeader className="font-bold">
                                                            Your Group Parameters:
                                                        </AlertDialogHeader>
                                                        <Separator></Separator>

                                                            <Table>
                                                                <TableHeader className="bg-blue-300">
                                                                    <TableRow>
                                                                        <TableHead className="w-[200px] font-bold">
                                                                            Group Name
                                                                        </TableHead>
                                                                        <TableHead className="w-[200px] font-bold">
                                                                            Address
                                                                        </TableHead>
                                                                        <TableHead className="w-[50px] font-bold">
                                                                            Select
                                                                        </TableHead>
                                                                    </TableRow>
                                                                </TableHeader>

                                                                <TableBody>
                                                                    <GroupParametersRows param={{
                                                                        id: "",
                                                                        address: "",
                                                                        nickname: "",
                                                                        traveltime: "",
                                                                        travelmode: "",
                                                                        isSaved: false
                                                                    }} index={0} />
                                                                </TableBody>
                                                            </Table>


                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction className="bg-green-400">
                                                                Import
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>{" "}saved parameters.
                        </p>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

interface Props {
    param: Parameter;
    index: number;
}

export const SingleParameter: React.FC<Props> = ({ param, index }) => {
    const router = useRouter();
    const { delParameter, saveParameter } = useApartmentContext();
    const colors = [
        "bg-red-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-orange-100",
        "bg-yellow-100",
        "bg-purple-200",
        "bg-brown-100",
        "bg-grey-100",
        "bg-blue-grey-100",
        "bg-deep-orange-100",
    ];
    let cardColor = "flex items-center justify-between px-4 py-2 " + colors[index];
    return (
        <Card>
            <div className={cardColor}>
                <CardTitle>{param.nickname}</CardTitle>
                <div className="flex items-center space-x-2">
                    {param.isSaved ? (
                        <div className="flex items-center">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Saved</span>
                        </div>
                    ) : (
                        <Button variant="success" size="sm" onClick={() => saveParameter(param)}>
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


