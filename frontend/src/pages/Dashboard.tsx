import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Ingredient } from '@/types/ingredient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

/* ── Palette shortcuts ── */
const P = {
  bg: 'var(--kusuriya-bg)',
  surface: 'var(--kusuriya-surface)',
  ink: 'var(--kusuriya-ink)',
  purple: 'var(--kusuriya-imperial-purple)',
  jade: 'var(--kusuriya-jade)',
  crimson: 'var(--kusuriya-crimson)',
  gold: 'var(--kusuriya-gold)',
  border: 'var(--kusuriya-border)',
  muted: '#7A7060',
  cream: '#E8E2D2',
};

/* ── Reusable style helpers ── */
const sectionTitle: React.CSSProperties = {
  fontFamily: "'Cinzel', serif",
  color: P.purple,
  letterSpacing: '0.06em',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: P.surface,
  border: `1px solid ${P.border}`,
  borderRadius: '0.75rem',
  boxShadow: '0 2px 8px rgba(44,42,41,0.07)',
};

const goldDivider: React.CSSProperties = {
  height: '1px',
  background: `linear-gradient(to right, transparent, ${P.gold}, transparent)`,
  opacity: 0.5,
  margin: '0.5rem 0 1.25rem',
};

export default function Dashboard() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Ingredient | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    stock: 0,
    expiration: '',
  });

  const loadIngredients = async () => {
    try {
      const data = await api.getIngredients();
      setIngredients(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido ao carregar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createIngredient(formData);
      toast.success('Ingrediente criado com sucesso!');
      setIsDialogOpen(false);
      loadIngredients();
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido ao criar.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      await api.updateIngredient(editingItem.id, formData);
      toast.success('Ingrediente atualizado com sucesso!');
      setIsDialogOpen(false);
      loadIngredients();
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido ao atualizar.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este ingrediente?')) return;
    try {
      await api.deleteIngredient(id);
      toast.success('Ingrediente excluído com sucesso!');
      loadIngredients();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro desconhecido ao excluir.');
    }
  };

  const openEdit = (item: Ingredient) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      stock: item.stock,
      expiration: item.expiration,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({ name: '', price: 0, description: '', stock: 0, expiration: '' });
  };

  /* ── Derived stats ── */
  const lowStock = ingredients.filter((i) => i.stock <= 10).length;
  const totalValue = ingredients
    .reduce((sum, i) => sum + i.price * i.stock, 0)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="space-y-8">
      {/* ══ Page header ══ */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={sectionTitle}>
            Ingredientes
          </h1>
          <div style={goldDivider} />
          <p style={{ fontFamily: "'Noto Serif JP', serif", color: P.muted, fontSize: '0.9rem' }}>
            Gerenciamento de ingredientes.
          </p>
        </div>

        {/* ── New ingredient dialog ── */}
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              style={{
                backgroundColor: P.jade,
                color: '#fff',
                border: `1px solid ${P.gold}`,
                fontFamily: "'Cinzel', serif",
                letterSpacing: '0.05em',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              ＋ Novo Ingrediente
            </Button>
          </DialogTrigger>

          <DialogContent
            style={{
              backgroundColor: P.surface,
              border: `1px solid ${P.gold}`,
              borderRadius: '0.75rem',
              boxShadow: '0 8px 30px rgba(44,42,41,0.15)',
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ ...sectionTitle, fontSize: '1.1rem' }}>
                {editingItem ? '✦ Editar Ingrediente' : '✦ Novo Ingrediente'}
              </DialogTitle>
              <div style={goldDivider} />
            </DialogHeader>

            <form onSubmit={editingItem ? handleUpdate : handleCreate} className="space-y-4 pt-2">
              {/* Name */}
              <div className="space-y-1">
                <Label
                  htmlFor="name"
                  style={{ color: P.purple, fontFamily: "'Cinzel', serif", fontSize: '0.8rem' }}
                >
                  Nome
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <Label
                  htmlFor="price"
                  style={{ color: P.purple, fontFamily: "'Cinzel', serif", fontSize: '0.8rem' }}
                >
                  Preço
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Ex: 12.50"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label
                  htmlFor="desc"
                  style={{ color: P.purple, fontFamily: "'Cinzel', serif", fontSize: '0.8rem' }}
                >
                  Descrição
                </Label>
                <Input
                  id="desc"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Stock + Expiration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="stock"
                    style={{ color: P.purple, fontFamily: "'Cinzel', serif", fontSize: '0.8rem' }}
                  >
                    Estoque
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="expiration"
                    style={{ color: P.purple, fontFamily: "'Cinzel', serif", fontSize: '0.8rem' }}
                  >
                    Validade
                  </Label>
                  <Input
                    id="expiration"
                    type="date"
                    value={formData.expiration}
                    onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: P.purple,
                  color: P.cream,
                  border: `1px solid ${P.gold}`,
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.05em',
                  marginTop: '0.5rem',
                }}
              >
                Salvar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ══ Metric cards ══ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total items */}
        <Card style={cardStyle}>
          <CardHeader className="pb-1 pt-4 px-5">
            <CardTitle
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Cinzel', serif", color: P.gold }}
            >
              Total de Itens
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <p
              className="text-4xl font-bold"
              style={{ color: P.purple, fontFamily: "'Cinzel', serif" }}
            >
              {ingredients.length}
            </p>
          </CardContent>
        </Card>

        {/* Low stock */}
        <Card style={{ ...cardStyle, borderLeft: `4px solid ${P.crimson}` }}>
          <CardHeader className="pb-1 pt-4 px-5">
            <CardTitle
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Cinzel', serif", color: P.crimson }}
            >
              Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <p
              className="text-4xl font-bold"
              style={{ color: P.crimson, fontFamily: "'Cinzel', serif" }}
            >
              {lowStock}
            </p>
            <p className="text-xs mt-1" style={{ color: P.muted }}>
              itens com ≤ 10 unidades
            </p>
          </CardContent>
        </Card>

        {/* Total value */}
        <Card style={{ ...cardStyle, borderLeft: `4px solid ${P.jade}` }}>
          <CardHeader className="pb-1 pt-4 px-5">
            <CardTitle
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Cinzel', serif", color: P.jade }}
            >
              Valor em Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4">
            <p
              className="text-2xl font-bold"
              style={{ color: P.jade, fontFamily: "'Cinzel', serif", wordBreak: 'break-all' }}
            >
              {totalValue}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ══ Ingredients table ══ */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p
            className="animate-pulse text-sm"
            style={{ color: P.muted, fontFamily: "'Noto Serif JP', serif" }}
          >
            ⏳ Carregando ingredientes...
          </p>
        </div>
      ) : ingredients.length === 0 ? (
        <Card
          className="flex flex-col items-center justify-center h-60 text-center"
          style={cardStyle}
        >
          <CardContent className="pt-6 space-y-4">
            <p style={{ color: P.muted, fontFamily: "'Noto Serif JP', serif" }}>
              Nenhum ingrediente encontrado.
            </p>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              style={{
                backgroundColor: P.jade,
                color: '#fff',
                border: `1px solid ${P.gold}`,
                fontFamily: "'Cinzel', serif",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              ＋ Criar Primeiro Ingrediente
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          style={{
            border: `1px solid ${P.border}`,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(44,42,41,0.07)',
          }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ backgroundColor: P.purple }}>
                {['ID', 'Nome', 'Preço', 'Estoque', 'Validade', 'Ações'].map((h) => (
                  <TableHead
                    key={h}
                    style={{
                      color: P.cream,
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.75rem',
                      letterSpacing: '0.07em',
                      borderBottom: `2px solid ${P.gold}`,
                    }}
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {ingredients.map((item, idx) => (
                <TableRow
                  key={item.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? P.surface : '#F9F6EF',
                    transition: 'background-color 0.2s',
                  }}
                  className="hover:brightness-95"
                >
                  <TableCell
                    className="font-medium"
                    style={{
                      color: P.muted,
                      fontFamily: "'Noto Serif JP', serif",
                      fontSize: '0.8rem',
                    }}
                  >
                    {item.id}
                  </TableCell>

                  <TableCell style={{ fontFamily: "'Noto Serif JP', serif", color: P.ink }}>
                    {item.name}
                  </TableCell>

                  <TableCell style={{ fontFamily: "'Noto Serif JP', serif", color: P.jade }}>
                    {Number(item.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </TableCell>

                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: item.stock > 10 ? P.jade : P.crimson,
                        color: '#fff',
                        border: `1px solid ${item.stock > 10 ? P.gold : P.crimson}`,
                        fontFamily: "'Noto Serif JP', serif",
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.stock} un.
                    </Badge>
                  </TableCell>

                  <TableCell
                    style={{
                      fontFamily: "'Noto Serif JP', serif",
                      fontSize: '0.875rem',
                      color: P.ink,
                    }}
                  >
                    {new Date(item.expiration).toLocaleDateString('pt-BR')}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(item)}
                        style={{
                          borderColor: P.gold,
                          color: P.purple,
                          fontFamily: "'Cinzel', serif",
                          fontSize: '0.72rem',
                          letterSpacing: '0.04em',
                        }}
                        className="hover:bg-amber-50 transition-colors"
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: P.crimson,
                          color: '#fff',
                          border: 'none',
                          fontFamily: "'Cinzel', serif",
                          fontSize: '0.72rem',
                          letterSpacing: '0.04em',
                        }}
                        className="hover:opacity-80 transition-opacity"
                      >
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
