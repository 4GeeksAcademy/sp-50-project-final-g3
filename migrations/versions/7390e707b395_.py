"""empty message

Revision ID: 7390e707b395
Revises: b16726578d03
Create Date: 2024-03-17 11:47:04.889603

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7390e707b395'
down_revision = 'b16726578d03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=True)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=True)

    with op.batch_alter_table('trainers', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=True)

    # ### end Alembic commands ###
