'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PlusIcon, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createQuestion } from '@/lib/api/questionClient';

const questionSchema = z.object({
  name: z.string().min(3, { message: 'Die Frage muss mindestens 3 Zeichen lang sein.' }),
  description: z.string().min(10, {
    message: 'Die Beschreibung muss mindestens 10 Zeichen lang sein.',
  }),
  scaleType: z.enum(['numeric', 'text']),
  scaleOptions: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Jede Option muss ausgefüllt sein.' }),
      })
    )
    .min(2, { message: 'Es müssen mindestens 2 Optionen vorhanden sein.' }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

type CreateQuestionProps = {
  surveyId: string;
  handleQuestionCreated: (question: any) => void;
};

export function CreateQuestionDialog({ surveyId, handleQuestionCreated }: CreateQuestionProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      name: '',
      description: '',
      scaleType: 'numeric',
      scaleOptions: [
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'scaleOptions',
  });

  const onSubmit = async (values: QuestionFormValues) => {
    try {
      const newQuestion = await createQuestion(
        values.name,
        values.description,
        values.scaleOptions[0].value,
        values.scaleOptions.length,
        values.scaleOptions[values.scaleOptions.length - 1].value,
        surveyId,
        values.scaleType,
        values.scaleOptions.map((option) => option.value)
      );

      if (newQuestion) {
        toast({
          title: 'Frage erstellt',
          description: 'Die Frage wurde erfolgreich hinzugefügt.',
        });
        setIsDialogOpen(false);
        form.reset();
        // Warte einen kurzen Moment, damit die API Zeit hat, die Änderungen zu verarbeiten
        await new Promise((resolve) => setTimeout(resolve, 100));
        handleQuestionCreated(newQuestion);
      }
    } catch (error) {
      console.error('Fehler beim Erstellen der Frage:', error);
      toast({
        title: 'Fehler',
        description: 'Die Frage konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" />
          Neue Frage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neue Frage erstellen</DialogTitle>
          <DialogDescription>
            Fügen Sie hier die Details für Ihre neue Likert-Skala Frage hinzu.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="z.B. Wie zufrieden sind Sie mit unserem Service?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschreibung</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Geben Sie hier weitere Details zur Frage an."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scaleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skala-Typ</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full p-2 border rounded">
                      <option value="numeric">Numerisch</option>
                      <option value="text">Text</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Skala-Optionen</FormLabel>
              {fields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`scaleOptions.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input {...field} />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ value: '' })}
              >
                Option hinzufügen
              </Button>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit">Speichern</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateQuestionDialog;
