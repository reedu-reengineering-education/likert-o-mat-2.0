import { Button } from "@/components/ui/button";
import CreateQuestionDialog from "@/components/forms/create-question-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Studio({ params }: { params: { surveyId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hier</Button>

      <CreateQuestionDialog surveyId={params.surveyId} />
      <Card className="min-w-[20rem]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
          <Button>Button</Button>
          <Button>Button</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
