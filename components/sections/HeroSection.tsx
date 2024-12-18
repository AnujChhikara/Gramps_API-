"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
interface ResponseItem {
  data: unknown;
  status: number;
}

export default function HeroSection() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [params, setParams] = useState("");
  const [body, setBody] = useState("");
  const [specialMode, setSpecialMode] = useState(false);
  const [response, setResponse] = useState<ResponseItem[]>([]);
  const [authToken, setAuthToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseTime, setResponseTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse([]); // Clear previous response
    setError("");

    let requestBody;

    try {
      if (specialMode) {
        if (body === "") {
          requestBody = [{}];
        } else {
          const parsedBody =
            body.trim().startsWith("[") && body.trim().endsWith("]")
              ? JSON.parse(body)
              : JSON.parse(`[${body}]`);
          requestBody = parsedBody;
        }
      } else {
        if (body === "" || body === null || body === undefined) {
          requestBody = JSON.parse("{}");
        } else {
          requestBody = JSON.parse(body);
        }
      }
    } catch {
      setError("Invalid JSON format. Please check the request body.");
      setIsLoading(false);
      return;
    }

    const startTime = performance.now();
    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          method: method,
          params: params,
          isBulkExecutor: specialMode,
          authToken: authToken,
          data: requestBody,
        }),
      });
      // Calculate time taken

      const endTime = performance.now();
      const duration = endTime - startTime;

      setResponseTime(Number(duration.toFixed(2)));

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      setResponseTime(Number(duration.toFixed(2)));
      setResponse([
        {
          data: "Server Error",
          status: 500,
        },
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-green-500";
      case "POST":
        return "text-yellow-500";
      case "PUT":
        return "text-blue-500";
      case "DELETE":
        return "text-red-500";
      case "PATCH":
        return "text-indigo-400";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    if (specialMode) {
      document.body.classList.add("special-mode-active");
    } else {
      document.body.classList.remove("special-mode-active");
    }
  }, [specialMode]);

  return (
    <div
      className='min-h-screen md:pt-20 dark 
      p-4 relative overflow-hidden'
    >
      {specialMode && (
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='absolute inset-0 bg-purple-900/20 animate-pulse'></div>
          <div className='absolute inset-0'>
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className='absolute w-0.5 h-16 bg-purple-500 animate-special-streak'
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      <p className='text-red-600 text-sm mt-2 mb-4'>{error}</p>
      <div className='flex items-center justify-center'>
        <Card className='relative z-10 shadow-lg shadow-zinc-900 md:w-11/12 items-center'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Request</CardTitle>
            <div className='flex items-center space-x-2'>
              <Label htmlFor='special-mode' className='text-sm'>
                Bulk Executor
              </Label>
              <Switch
                id='special-mode'
                checked={specialMode}
                onCheckedChange={setSpecialMode}
              />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex gap-4 mb-4'>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger
                    className={`w-[180px] ${getMethodColor(method)} font-bold`}
                  >
                    <SelectValue placeholder='Method' />
                  </SelectTrigger>
                  <SelectContent className='bg-black border-none font-semibold'>
                    <SelectItem value='GET' className='text-green-500'>
                      GET
                    </SelectItem>
                    <SelectItem value='POST' className='text-yellow-500'>
                      POST
                    </SelectItem>
                    <SelectItem value='PATCH' className='text-indigo-400'>
                      PATCH
                    </SelectItem>
                    <SelectItem value='PUT' className='text-blue-500'>
                      PUT
                    </SelectItem>
                    <SelectItem value='DELETE' className='text-red-500'>
                      DELETE
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type='url'
                  placeholder='Enter URL'
                  value={url}
                  required
                  onChange={(e) => setUrl(e.target.value)}
                  className='flex-grow'
                />
                <Button type='submit' variant='secondary' disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Send
                </Button>
              </div>
              <Tabs defaultValue='params'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='params'>Params</TabsTrigger>
                  <TabsTrigger value='body'>Body</TabsTrigger>
                  <TabsTrigger value='auth'>Auth Token</TabsTrigger>
                </TabsList>
                <TabsContent value='params'>
                  <Label htmlFor='params'>Query Params</Label>
                  <Textarea
                    id='params'
                    placeholder='key=value&key2=value2'
                    className='mt-2 h-40'
                    value={params}
                    onChange={(e) => setParams(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value='body'>
                  <Label htmlFor='body'>Request Body</Label>
                  <Textarea
                    id='body'
                    placeholder={
                      specialMode ? '[{"key": "value"}]' : '{"key": "value"}'
                    }
                    className='mt-2 h-40'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </TabsContent>
                <TabsContent value='auth'>
                  <Label htmlFor='auth'>Authorization</Label>
                  <Textarea
                    id='auth'
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    placeholder='Bearer token'
                    className='mt-2 h-40'
                  />
                </TabsContent>
              </Tabs>
            </form>
          </CardContent>
          <CardFooter>
            <div className='w-full'>
              <Label htmlFor='response'>Response</Label>
              <pre className='mt-2 p-4 bg-muted rounded-md overflow-x-auto min-h-[100px]'>
                {isLoading ? (
                  <div className='animate-pulse space-y-2'>
                    <div className='h-4 bg-gray-700 rounded w-3/4'></div>
                    <div className='h-4 bg-gray-700 rounded w-1/2'></div>
                    <div className='h-4 bg-gray-700 rounded w-2/3'></div>
                  </div>
                ) : (
                  <div className='flex flex-col h-80 overflow-y-auto'>
                    <div className='flex space-x-4  pr-4 justify-end'>
                      <p
                        className={`font-bold ${
                          responseTime < 1000
                            ? "text-green-500"
                            : responseTime < 2000
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {responseTime}ms
                      </p>
                    </div>
                    <code>
                      {Array.isArray(response) &&
                        response.map((item: ResponseItem, index: number) => {
                          return (
                            <div
                              key={index}
                              className='mb-4 p-4 bg-zinc-900 rounded-lg shadow-md'
                            >
                              <div className='flex flex-col space-y-2'>
                                <p className='text-sm text-gray-400'>
                                  <span className='font-bold text-gray-300'>
                                    Status:
                                  </span>{" "}
                                  <span
                                    className={`
    ${
      item.status >= 200 && item.status < 300
        ? "text-green-500"
        : item.status >= 400 && item.status < 500
        ? "text-yellow-500"
        : item.status >= 500 && item.status < 600
        ? "text-red-500"
        : "text-gray-500"
    }
  `}
                                  >
                                    {item.status}
                                  </span>
                                </p>
                                <code className='block p-4 bg-zinc-950 text-white rounded-md overflow-x-auto'>
                                  {JSON.stringify(item.data, null, 2)}
                                </code>
                              </div>
                            </div>
                          );
                        })}
                    </code>
                  </div>
                )}
              </pre>
            </div>
          </CardFooter>
        </Card>
      </div>
      <p className='text-sm text-green-800 mt-4 font-semibold flex justify-end md:w-11/12'>
        {" "}
        * Localhost requests are not supported here. Please use our Chrome
        extension for that.{" "}
      </p>
    </div>
  );
}
