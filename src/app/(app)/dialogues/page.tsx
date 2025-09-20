import { dialogueScenarios } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DialogueSimulation from './dialogue-simulation';

export default function DialoguesPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          Dialogue Simulations
        </h1>
        <p className="text-muted-foreground">
          Practice real-world conversations and improve your fluency.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {dialogueScenarios.map((scenario) => (
          <Card key={scenario.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline">{scenario.title}</CardTitle>
                <Badge variant={scenario.difficulty === 'Easy' ? 'secondary' : 'default'}>{scenario.difficulty}</Badge>
              </div>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <DialogueSimulation scenario={scenario} />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
